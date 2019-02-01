import { Observable } from 'rxjs'
import { toArray } from 'rxjs/operators'
import BaseAdapter from './BaseAdapter'

describe('base data adapter', () => {
  it('throws if instantiated directly', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new BaseAdapter({}, {})
    }).toThrow(/Cannot create BaseAdapter instances directly/)
  })

  it('throws if loadData() is not overridden by the subclass', async () => {
    class Adapter extends BaseAdapter {
      async getFeaturesInRegion() {
        return Observable.create(observer => {
          observer.next({
            id: 'testFeature',
            start: 100,
            end: 200,
          })
          observer.complete()
        })
      }
    }
    const adapter = new Adapter({ assemblyName: 'volvox' }, {})
    await expect(
      adapter.regularizeAndGetFeaturesInRegion({
        assemblyName: 'volvox',
        refName: 'ctgA',
        start: 0,
        end: 20000,
      }),
    ).rejects.toThrow(/loadData should be overridden by the subclass/)
  })

  it('throws if getFeaturesInRegion() is not overridden by the subclass', async () => {
    class Adapter extends BaseAdapter {
      async loadData() {
        return ['ctgA', 'ctgB']
      }
    }
    const adapter = new Adapter({ assemblyName: 'volvox' }, {})
    await expect(
      adapter.regularizeAndGetFeaturesInRegion({
        assemblyName: 'volvox',
        refName: 'ctgA',
        start: 0,
        end: 20000,
      }),
    ).rejects.toThrow(
      /getFeaturesInRegion should be overridden by the subclass/,
    )
  })

  it('throws if freeResources() is not overridden by the subclass', async () => {
    class Adapter extends BaseAdapter {
      async loadData() {
        return ['ctgA', 'ctgB']
      }
    }
    const adapter = new Adapter({ assemblyName: 'volvox' }, {})
    expect(() => adapter.freeResources()).toThrow(
      /freeResources should be overridden by the subclass/,
    )
  })

  it('throws if hasDataForRefSeq is called before loadRefSeqs', async () => {
    class Adapter extends BaseAdapter {
      async loadData() {
        return ['ctgA', 'ctgB']
      }
    }
    const adapter = new Adapter({ assemblyName: 'volvox' }, {})
    expect(() =>
      adapter.hasDataForRefSeq({ assemblyName: 'volvox', refName: 'ctgA' }),
    ).toThrow(
      /"loadRefSeqs" must be called before "hasDataForRefSeq" can be called/,
    )
  })

  it('retrieves features', async () => {
    class Adapter extends BaseAdapter {
      async loadData() {
        return ['ctgA', 'ctgB']
      }

      async getFeaturesInRegion() {
        return Observable.create(observer => {
          observer.next({
            id: 'testFeature',
            start: 100,
            end: 200,
          })
          observer.complete()
        })
      }
    }
    const adapter = new Adapter({ assemblyName: 'volvox' }, {})
    const features = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'volvox',
      refName: 'ctgA',
      start: 0,
      end: 20000,
    })
    const featuresArray = await features.pipe(toArray()).toPromise()
    expect(featuresArray).toMatchInlineSnapshot(`
Array [
  Object {
    "end": 200,
    "id": "testFeature",
    "start": 100,
  },
]
`)
    const features2 = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'volvox',
      refName: 'ctgC',
      start: 0,
      end: 20000,
    })
    const featuresArray2 = await features2.pipe(toArray()).toPromise()
    expect(featuresArray2).toMatchInlineSnapshot(`Array []`)
  })

  it('regularizes an assembly name in a query', async () => {
    class Adapter extends BaseAdapter {
      async loadData() {
        return ['ctgA', 'ctgB']
      }

      async getFeaturesInRegion() {
        return Observable.create(observer => {
          observer.next({
            id: 'testFeature',
            start: 100,
            end: 200,
          })
          observer.complete()
        })
      }
    }
    const adapter = new Adapter(
      { assemblyName: 'volvox' },
      {
        assemblies: {
          volvox: {
            aliases: ['vvx'],
            seqNameAliases: {
              A: ['ctgA', 'contigA'],
              B: ['ctgB', 'contigB'],
            },
          },
        },
      },
    )
    const features = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'wrongAssemblyName',
      refName: 'ctgA',
      start: 0,
      end: 20000,
    })
    const featuresArray = await features.pipe(toArray()).toPromise()
    expect(featuresArray).toMatchInlineSnapshot(`Array []`)
    const features2 = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'vvx',
      refName: 'ctgA',
      start: 0,
      end: 20000,
    })
    const featuresArray2 = await features2.pipe(toArray()).toPromise()
    expect(featuresArray2).toMatchInlineSnapshot(`
Array [
  Object {
    "end": 200,
    "id": "testFeature",
    "start": 100,
  },
]
`)
  })

  it('regularizes an assembly name in its configuration', async () => {
    class Adapter extends BaseAdapter {
      async loadData() {
        return ['ctgA', 'ctgB']
      }

      async getFeaturesInRegion() {
        return Observable.create(observer => {
          observer.next({
            id: 'testFeature',
            start: 100,
            end: 200,
          })
          observer.complete()
        })
      }
    }
    const adapter = new Adapter(
      { assemblyName: 'vvx' },
      {
        assemblies: {
          volvox: {
            aliases: ['vvx'],
            seqNameAliases: {
              A: ['ctgA', 'contigA'],
              B: ['ctgB', 'contigB'],
            },
          },
        },
      },
    )
    const features = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'volvox',
      refName: 'ctgA',
      start: 0,
      end: 20000,
    })
    const featuresArray = await features.pipe(toArray()).toPromise()
    const features2 = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'vvx',
      refName: 'ctgA',
      start: 0,
      end: 20000,
    })
    const featuresArray2 = await features2.pipe(toArray()).toPromise()
    expect(featuresArray).toEqual(featuresArray2)
  })

  it('regularizes a reference name in a query', async () => {
    class Adapter extends BaseAdapter {
      async loadData() {
        return ['A', 'ctgB']
      }

      async getFeaturesInRegion(region) {
        return Observable.create(observer => {
          const { refName } = region
          let feature = {}
          if (refName === 'A')
            feature = {
              id: 'testFeature',
              start: 100,
              end: 200,
            }
          else if (refName === 'ctgB')
            feature = {
              id: 'testFeature',
              start: 300,
              end: 400,
            }
          else throw new Error('unrecognized refName')
          observer.next(feature)
          observer.complete()
        })
      }
    }
    const adapter = new Adapter(
      { assemblyName: 'volvox' },
      {
        assemblies: {
          volvox: {
            aliases: ['vvx'],
            seqNameAliases: {
              A: ['ctgA', 'contigA'],
              B: ['ctgB', 'contigB'],
            },
          },
        },
      },
    )
    const features = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'volvox',
      refName: 'A',
      start: 0,
      end: 20000,
    })
    const featuresArray = await features.pipe(toArray()).toPromise()
    const features2 = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'vvx',
      refName: 'ctgA',
      start: 0,
      end: 20000,
    })
    const featuresArray2 = await features2.pipe(toArray()).toPromise()
    const features3 = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'vvx',
      refName: 'contigA',
      start: 0,
      end: 20000,
    })
    const featuresArray3 = await features3.pipe(toArray()).toPromise()
    expect(featuresArray).toEqual(featuresArray2)
    expect(featuresArray).toEqual(featuresArray3)
    const features4 = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'volvox',
      refName: 'B',
      start: 0,
      end: 20000,
    })
    const featuresArray4 = await features4.pipe(toArray()).toPromise()
    const features5 = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'vvx',
      refName: 'ctgB',
      start: 0,
      end: 20000,
    })
    const featuresArray5 = await features5.pipe(toArray()).toPromise()
    const features6 = await adapter.regularizeAndGetFeaturesInRegion({
      assemblyName: 'vvx',
      refName: 'contigB',
      start: 0,
      end: 20000,
    })
    const featuresArray6 = await features6.pipe(toArray()).toPromise()
    expect(featuresArray4).toEqual(featuresArray5)
    expect(featuresArray4).toEqual(featuresArray6)
  })
})