import { getSnapshot } from 'mobx-state-tree'
import 'typeface-roboto'
import JBrowse from './JBrowse'

const jbrowse = new JBrowse()

jbrowse.configure()

const { model } = jbrowse
model.addView('LinearGenomeView')
model.views[0].displayRegions([
  {
    assembly: 'volvox',
    refName: 'ctgA',
    start: 0,
    end: 200,
  },
  { assembly: 'volvox', refName: 'ctgB', start: 0, end: 100000000 },
])

model.views[0].addTrack('foo', 'Foo Track', 'AlignmentsTrack')
model.views[0].addTrack('bar', 'Bar Track', 'AlignmentsTrack')
model.views[0].addTrack('baz', 'Baz Track', 'AlignmentsTrack')
model.addView('LinearGenomeView')
model.views[1].addTrack('bee', 'Bee Track', 'AlignmentsTrack')
model.views[1].addTrack('bonk', 'Bonk Track', 'AlignmentsTrack')
model.views[1].tracks.get('bee').configuration.backgroundColor.set('red')

model.addDrawerWidget('HierarchicalTrackSelectorDrawerWidget')

window.MODEL = model
window.getSnapshot = getSnapshot

jbrowse.start()
