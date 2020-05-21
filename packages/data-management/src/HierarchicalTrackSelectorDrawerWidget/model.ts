/* eslint-disable @typescript-eslint/no-explicit-any */
import { types, Instance } from 'mobx-state-tree'
import { readConfObject } from '@gmod/jbrowse-core/configuration'
import { AnyConfigurationModel } from '@gmod/jbrowse-core/configuration/configurationSchema'

import PluginManager from '@gmod/jbrowse-core/PluginManager'
import { getSession } from '@gmod/jbrowse-core/util'
import { ElementId } from '@gmod/jbrowse-core/util/types/mst'

export function generateHierarchy(
  trackConfigurations: AnyConfigurationModel[],
) {
  const hierarchy = new Map()

  trackConfigurations.forEach(trackConf => {
    const categories = [...(readConfObject(trackConf, 'category') || [])]

    let currLevel = hierarchy
    for (let i = 0; i < categories.length; i += 1) {
      const category = categories[i]
      if (!currLevel.has(category)) currLevel.set(category, new Map())
      currLevel = currLevel.get(category)
    }
    currLevel.set(trackConf.trackId, trackConf)
  })
  return hierarchy
}

export default function stateModelFactory(pluginManager: PluginManager) {
  return types
    .model('HierarchicalTrackSelectorDrawerWidget', {
      id: ElementId,
      type: types.literal('HierarchicalTrackSelectorDrawerWidget'),
      collapsed: types.map(types.boolean), // map of category path -> boolean of whether it is collapsed
      filterText: '',
      view: types.safeReference(
        pluginManager.pluggableMstType('view', 'stateModel'),
      ),
    })
    .actions(self => ({
      setView(view: any) {
        self.view = view
      },
      toggleCategory(pathName: string) {
        self.collapsed.set(pathName, !self.collapsed.get(pathName))
      },
      clearFilterText() {
        self.filterText = ''
      },
      setFilterText(newText: string) {
        self.filterText = newText
      },
    }))
    .views(self => ({
      trackConfigurations(assemblyName: string) {
        if (!self.view) return []
        const session = getSession(self) as any
        const trackConfigurations = session.tracks

        const relevantTrackConfigurations = trackConfigurations.filter(
          (conf: AnyConfigurationModel) =>
            conf.viewType === self.view.type &&
            readConfObject(conf, 'assemblyNames').includes(assemblyName),
        )
        return relevantTrackConfigurations
      },

      get assemblyNames() {
        return self.view ? self.view.assemblyNames : []
      },

      connectionTrackConfigurations(connection: any) {
        if (!self.view) return []
        const trackConfigurations = connection.tracks

        const relevantTrackConfigurations = trackConfigurations.filter(
          (conf: AnyConfigurationModel) => conf.viewType === self.view.type,
        )
        return relevantTrackConfigurations
      },

      hierarchy(assemblyName: string) {
        return generateHierarchy(this.trackConfigurations(assemblyName))
      },

      connectionHierarchy(connection: any) {
        return generateHierarchy(this.connectionTrackConfigurations(connection))
      },

      // This recursively gets tracks from lower paths
      allTracksInCategoryPath(
        path: string[],
        connection?: any,
        assemblyName?: string,
      ) {
        let currentHier = connection
          ? this.connectionHierarchy(connection)
          : this.hierarchy(assemblyName as string)
        path.forEach(pathItem => {
          currentHier = currentHier.get(pathItem) || new Map()
        })
        let tracks: { [key: string]: any } = {}
        currentHier.forEach((contents, name) => {
          if (contents.trackId) {
            tracks[contents.trackId] = contents
          } else {
            tracks = Object.assign(
              tracks,
              this.allTracksInCategoryPath(path.concat([name])),
            )
          }
        })
        return tracks
      },
    }))
}

export type HierarchicalTrackSelectorStateModel = ReturnType<
  typeof stateModelFactory
>
export type HierarchicalTrackSelectorModel = Instance<
  HierarchicalTrackSelectorStateModel
>