/* eslint-disable @typescript-eslint/no-explicit-any */
import { autorun } from 'mobx'
import {
  types,
  getParent,
  addDisposer,
  isAlive,
  SnapshotIn,
} from 'mobx-state-tree'

import { IRegion } from '@gmod/jbrowse-core/mst-types'
import { readConfObject } from '@gmod/jbrowse-core/configuration'
import { isConfigurationModel } from '@gmod/jbrowse-core/configuration/configurationSchema'

export default function sessionModelFactory(pluginManager: any) {
  const minWidth = 384
  const minDrawerWidth = 128
  return types
    .model('JBrowseWebSessionModel', {
      name: types.identifier,
      width: types.optional(
        types.refinement(types.integer, width => width >= minWidth),
        1024,
      ),
      drawerWidth: types.optional(
        types.refinement(types.integer, width => width >= minDrawerWidth),
        384,
      ),
      views: types.array(pluginManager.pluggableMstType('view', 'stateModel')),
      drawerWidgets: types.map(
        pluginManager.pluggableMstType('drawer widget', 'stateModel'),
      ),
      activeDrawerWidgets: types.map(
        types.safeReference(
          pluginManager.pluggableMstType('drawer widget', 'stateModel'),
        ),
      ),
      menuBars: types.array(
        pluginManager.pluggableMstType('menu bar', 'stateModel'),
      ),
      connections: types.map(
        types.array(pluginManager.pluggableMstType('connection', 'stateModel')),
      ),
    })
    .volatile((/* self */) => ({
      pluginManager,
      /**
       * this is the globally "selected" object. can be anything.
       * code that wants to deal with this should examine it to see what
       * kind of thing it is.
       */
      selection: undefined,
      /**
       * this is the current "task" that is being performed in the UI.
       * this is usually an object of the form
       * { taskName: "configure", target: thing_being_configured }
       */
      task: undefined,
    }))
    .views(self => ({
      get rpcManager() {
        return getParent(self).jbrowse.rpcManager
      },
      get assemblyData() {
        return getParent(self).jbrowse.assemblyData
      },
      get configuration() {
        return getParent(self).jbrowse.configuration
      },
      get datasets() {
        return getParent(self).jbrowse.datasets
      },
      get savedSessions() {
        return getParent(self).jbrowse.savedSessions
      },
      get savedSessionNames() {
        return getParent(self).jbrowse.savedSessionNames
      },
      get history() {
        return getParent(self).history
      },
      get viewsWidth() {
        // TODO: when drawer is permanent, subtract its width
        return self.width - (this.visibleDrawerWidget ? self.drawerWidth : 0)
      },
      get maxDrawerWidth() {
        return self.width - 256
      },

      get visibleDrawerWidget() {
        if (isAlive(self))
          // returns most recently added item in active drawer widgets
          return Array.from(self.activeDrawerWidgets.values())[
            self.activeDrawerWidgets.size - 1
          ]
        return undefined
      },
    }))
    .actions(self => ({
      afterCreate() {
        const disposer = autorun(() => {
          self.views.forEach(view => {
            view.setWidth(self.viewsWidth)
          })
        })
        addDisposer(self, disposer)

        const displayedRegionsDisposer = autorun(async () => {
          for (const view of self.views) {
            const assemblyName = view.displayRegionsFromAssemblyName
            if (
              assemblyName &&
              self.assemblyData.get(assemblyName) &&
              self.assemblyData.get(assemblyName).sequence
            ) {
              // eslint-disable-next-line no-await-in-loop
              const displayedRegions = await this.getRegionsForAssembly(
                assemblyName,
                self.assemblyData,
              )
              if (isAlive(self)) {
                getParent(self).history.withoutUndo(() => {
                  if (
                    JSON.stringify(view.displayedRegions) !==
                    JSON.stringify(displayedRegions)
                  )
                    view.setDisplayedRegions(displayedRegions, true)
                })
              }
            }
          }
        })
        addDisposer(self, displayedRegionsDisposer)
      },

      getRegionsForAssembly(
        assemblyName: string,
        assemblyData: any,
        opts: { signal?: AbortSignal } = {},
      ) {
        const assembly = assemblyData.get(assemblyName)
        if (assembly) {
          const adapterConfig = readConfObject(assembly.sequence, 'adapter')
          return self.rpcManager
            .call(
              adapterConfig.configId,
              'getRegions',
              {
                sessionId: assemblyName,
                adapterType: adapterConfig.type,
                adapterConfig,
                signal: opts.signal,
              },
              { timeout: 1000000 },
            )
            .then((adapterRegions: IRegion[]) => {
              const adapterRegionsWithAssembly = adapterRegions.map(
                adapterRegion => ({
                  ...adapterRegion,
                  assemblyName,
                }),
              )
              return adapterRegionsWithAssembly
            })
        }
        return Promise.resolve(undefined)
      },

      makeConnection(configuration: any, initialSnapshot = {}) {
        const { type } = configuration
        if (!type) throw new Error('track configuration has no `type` listed')
        const name = readConfObject(configuration, 'name')
        const connectionType = pluginManager.getConnectionType(type)
        if (!connectionType) throw new Error(`unknown connection type ${type}`)
        let confParent = configuration
        do {
          confParent = getParent(confParent)
        } while (!confParent.assembly)
        const assemblyName = readConfObject(confParent.assembly, 'name')
        const connectionData = { ...initialSnapshot, name, type, configuration }
        if (!self.connections.has(assemblyName))
          self.connections.set(assemblyName, [])
        const assemblyConnections = self.connections.get(assemblyName)
        if (!assemblyConnections)
          throw new Error(`assembly ${assemblyName} not found`)
        const length = assemblyConnections.push(connectionData)
        return assemblyConnections[length - 1]
      },

      breakConnection(configuration: any) {
        const name = readConfObject(configuration, 'name')
        let confParent = configuration
        do {
          confParent = getParent(confParent)
        } while (!confParent.assembly)
        const assemblyName = readConfObject(confParent.assembly, 'name')
        const connections = self.connections.get(assemblyName)
        if (!connections)
          throw new Error(`connections for ${assemblyName} not found`)
        const connection = connections.find(c => c.name === name)
        connections.remove(connection)
      },

      updateWidth(width: number) {
        let newWidth = Math.floor(width)
        if (newWidth === self.width) return
        if (newWidth < minWidth) newWidth = minWidth
        self.width = newWidth
        if (self.drawerWidth > self.maxDrawerWidth)
          self.drawerWidth = self.maxDrawerWidth
      },

      updateDrawerWidth(drawerWidth: number) {
        if (drawerWidth === self.drawerWidth) return self.drawerWidth
        let newDrawerWidth = drawerWidth
        if (newDrawerWidth < minDrawerWidth) newDrawerWidth = minDrawerWidth
        if (newDrawerWidth > self.maxDrawerWidth)
          newDrawerWidth = self.maxDrawerWidth
        self.drawerWidth = newDrawerWidth
        return newDrawerWidth
      },

      resizeDrawer(distance: number) {
        const oldDrawerWidth = self.drawerWidth
        const newDrawerWidth = this.updateDrawerWidth(oldDrawerWidth - distance)
        const actualDistance = oldDrawerWidth - newDrawerWidth
        return actualDistance
      },

      addView(typeName: string, initialState = {}) {
        const typeDefinition = pluginManager.getElementType('view', typeName)
        if (!typeDefinition) throw new Error(`unknown view type ${typeName}`)

        const length = self.views.push({
          ...initialState,
          type: typeName,
        })
        return self.views[length - 1]
      },

      removeView(view: any) {
        for (const [id, drawerWidget] of self.activeDrawerWidgets) {
          if (
            id === 'hierarchicalTrackSelector' &&
            drawerWidget.view &&
            drawerWidget.view.id === view.id
          )
            this.hideDrawerWidget(drawerWidget)
        }
        self.views.remove(view)
      },

      addDataset(datasetConf: any) {
        return getParent(self).jbrowse.addDataset(datasetConf)
      },

      addLinearGenomeViewOfDataset(datasetName: string, initialState = {}) {
        return this.addViewOfDataset(
          'LinearGenomeView',
          datasetName,
          initialState,
        )
      },

      addViewOfDataset(
        viewType: any,
        datasetName: string,
        initialState: any = {},
      ) {
        const dataset = self.datasets.find(
          (s: { name: string }) => readConfObject(s.name) === datasetName,
        )
        if (!dataset)
          throw new Error(
            `Could not add view of dataset "${datasetName}", dataset name not found`,
          )
        initialState.displayRegionsFromAssemblyName = readConfObject(
          dataset.assembly,
          'name',
        )
        return this.addView(viewType, initialState)
      },

      addViewFromAnotherView(
        viewType: any,
        otherView: any,
        initialState: {
          displayedRegions?: IRegion[]
          displayRegionsFromAssemblyName?: boolean
        } = {},
      ) {
        const state = { ...initialState }
        if (otherView.displayRegionsFromAssemblyName) {
          state.displayRegionsFromAssemblyName =
            otherView.displayRegionsFromAssemblyName
        } else {
          state.displayedRegions = otherView.displayedRegions
        }
        return this.addView(viewType, state)
      },

      addDrawerWidget(
        typeName: string,
        id: string,
        initialState = {},
        configuration = { type: typeName },
      ) {
        const typeDefinition = pluginManager.getElementType(
          'drawer widget',
          typeName,
        )
        if (!typeDefinition)
          throw new Error(`unknown drawer widget type ${typeName}`)
        const data = {
          ...initialState,
          id,
          type: typeName,
          configuration,
        }
        self.drawerWidgets.set(id, data)
        return self.drawerWidgets.get(id)
      },

      showDrawerWidget(drawerWidget: any) {
        if (self.activeDrawerWidgets.has(drawerWidget.id))
          self.activeDrawerWidgets.delete(drawerWidget.id)
        self.activeDrawerWidgets.set(drawerWidget.id, drawerWidget)
      },

      hideDrawerWidget(drawerWidget: any) {
        self.activeDrawerWidgets.delete(drawerWidget.id)
      },

      hideAllDrawerWidgets() {
        self.activeDrawerWidgets.clear()
      },

      addMenuBar(
        typeName: string,
        initialState = {},
        configuration = { type: typeName },
      ) {
        const typeDefinition = pluginManager.getElementType(
          'menu bar',
          typeName,
        )
        if (!typeDefinition)
          throw new Error(`unknown menu bar type ${typeName}`)
        const data = { ...initialState, type: typeName, configuration }
        const model = typeDefinition.stateModel.create(data)
        self.menuBars.push(model)
      },

      /**
       * set the global selection, i.e. the globally-selected object.
       * can be a feature, a view, just about anything
       * @param {object} thing
       */
      setSelection(thing: any) {
        self.selection = thing
        // console.log('selected', thing)
      },

      /**
       * clears the global selection
       */
      clearSelection() {
        self.selection = undefined
        // console.log('selection cleared')
      },

      /**
       * opens a configuration editor to configure the given thing,
       * and sets the current task to be configuring it
       * @param {*} configuration
       */
      editConfiguration(configuration: any) {
        if (!isConfigurationModel(configuration)) {
          throw new Error(
            'must pass a configuration model to editConfiguration',
          )
        }
        const editor = this.addDrawerWidget(
          'ConfigurationEditorDrawerWidget',
          'configEditor',
          { target: configuration },
        )
        this.showDrawerWidget(editor)
      },

      clearConnections() {
        self.connections.clear()
      },

      addSavedSession(sessionSnapshot: SnapshotIn<typeof self>) {
        return getParent(self).jbrowse.addSavedSession(sessionSnapshot)
      },

      removeSavedSession(sessionSnapshot: any) {
        return getParent(self).jbrowse.removeSavedSession(sessionSnapshot)
      },

      renameCurrentSession(sessionName: string) {
        return getParent(self).renameCurrentSession(sessionName)
      },

      duplicateCurrentSession() {
        return getParent(self).duplicateCurrentSession()
      },

      activateSession(sessionName: any) {
        return getParent(self).activateSession(sessionName)
      },

      setDefaultSession() {
        return getParent(self).setDefaultSession()
      },
    }))
}

export type SessionStateModel = ReturnType<typeof sessionModelFactory>

// a track is a combination of a dataset and a renderer, along with some conditions
// specifying in which contexts it is available (which assemblies, which views, etc)