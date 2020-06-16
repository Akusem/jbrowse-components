import { ConfigurationSchema } from '@gmod/jbrowse-core/configuration'
import { ElementId } from '@gmod/jbrowse-core/util/types/mst'
import { types } from 'mobx-state-tree'

export const configSchema = ConfigurationSchema('GDCFeatureDrawerWidget', {})
export const stateModel = types
  .model('GDCFeatureDrawerWidget', {
    id: ElementId,
    type: types.literal('GDCFeatureDrawerWidget'),
    featureData: types.frozen({}),
  })
  .actions(self => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFeatureData(data: any) {
      self.featureData = data
    },
    clearFeatureData() {
      self.featureData = {}
    },
  }))

export const ReactComponent = import('./GDCFeatureDrawerWidget')
