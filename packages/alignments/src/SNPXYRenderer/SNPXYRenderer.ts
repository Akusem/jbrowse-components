import { readConfObject } from '@gmod/jbrowse-core/configuration'
import { featureSpanPx } from '@gmod/jbrowse-core/util'
import { Feature } from '@gmod/jbrowse-core/util/simpleFeature'
import { IRegion } from '@gmod/jbrowse-core/mst-types'
import Color from 'color'
import SNPBaseRenderer from '../SNPBaseRenderer'
import NestedFrequencyTable from '../NestedFrequencyTable'
import { Mismatch } from '../SNPAdapter/SNPSlightlyLazyFeature'
import { getOrigin, getScale } from '../util'

interface SNPXYRendererProps {
  features: Map<string, Feature>
  layout: any // eslint-disable-line @typescript-eslint/no-explicit-any
  config: any // eslint-disable-line @typescript-eslint/no-explicit-any
  region: IRegion
  bpPerPx: number
  height: number
  width: number
  horizontallyFlipped: boolean
  highResolutionScaling: number
  blockKey: string
  dataAdapter: any
  notReady: boolean
  originalRegion: IRegion
  scaleOpts: any
  sessionId: string
  signal: any
  trackModel: any
}

export default class SNPXYRenderer extends SNPBaseRenderer {
  // use coverage bins generated above to draw
  draw(
    ctx: CanvasRenderingContext2D,
    props: SNPXYRendererProps,
    coverageBins: Array<NestedFrequencyTable>,
  ) {
    const {
      features,
      region,
      bpPerPx,
      scaleOpts,
      height,
      config,
      horizontallyFlipped,
    } = props

    console.log(bpPerPx)

    const viewScale = getScale({ ...scaleOpts, range: [0, height] })
    const originY = getOrigin(scaleOpts.scaleType)
    const [niceMin, niceMax] = viewScale.domain()
    const toY = (rawscore: number) => height - viewScale(rawscore)
    const toHeight = (rawscore: number) => toY(originY) - toY(rawscore)

    const insRegex = /^ins.[A-Za-z0-9]/
    // A: green, C: blue, g: orange, t: red, deletion: dark grey, total: light grey
    const colorForBase: { [key: string]: string } = {
      A: '#00bf00',
      C: '#4747ff',
      G: '#ffa500',
      T: '#f00',
      '*': 'darkgrey',
      total: 'lightgrey',
    }
    for (const feature of features.values()) {
      const [leftPx, rightPx] = featureSpanPx(
        feature,
        region,
        bpPerPx,
        horizontallyFlipped,
      )
      const score = feature.get('score')

      // draw total
      ctx.fillStyle = colorForBase.total
      const w = rightPx - leftPx + 0.3
      ctx.fillRect(leftPx, toY(score), w, toHeight(score))

      // generate array with nestedtable's info, draw mismatches
      const infoArray = feature.get('snpinfo')
      infoArray.forEach(function iterate(mismatch, mismatchindex) {
        if (mismatch.base === 'reference' || mismatch.base === 'total') return
        ctx.fillStyle = mismatch.base.match(insRegex)
          ? 'darkgrey'
          : colorForBase[mismatch.base]
        ctx.fillRect(leftPx, toY(mismatch.score), w, toHeight(mismatch.score))
      })
    }
  }
}
