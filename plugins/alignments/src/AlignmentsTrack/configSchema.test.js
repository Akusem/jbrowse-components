import Plugin from '@gmod/jbrowse-core/Plugin'
import PluginManager from '@gmod/jbrowse-core/PluginManager'
import BoxRendererType from '@gmod/jbrowse-core/pluggableElementTypes/renderers/BoxRendererType'
import {
  svgFeatureRendererConfigSchema,
  SvgFeatureRendererReactComponent,
} from '@gmod/jbrowse-plugin-svg'
import PileupRenderer, {
  configSchema as pileupRendererConfigSchema,
  ReactComponent as PileupRendererReactComponent,
} from '../PileupRenderer'
import SNPCoverageRenderer, {
  configSchema as snpCoverageRendererConfigSchema,
  ReactComponent as SNPCoverageRendererReactComponent,
} from '../SNPCoverageRenderer'
import configSchemaFactory from './configSchema'

// mock warnings to avoid unnecessary outputs
beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  console.warn.mockRestore()
})

class PileupRendererPlugin extends Plugin {
  install(pluginManager) {
    pluginManager.addRendererType(
      () =>
        new PileupRenderer({
          name: 'PileupRenderer',
          ReactComponent: PileupRendererReactComponent,
          configSchema: pileupRendererConfigSchema,
        }),
    )
  }
}

class SvgFeatureRendererPlugin extends Plugin {
  install(pluginManager) {
    pluginManager.addRendererType(
      () =>
        new BoxRendererType({
          name: 'SvgFeatureRenderer',
          ReactComponent: SvgFeatureRendererReactComponent,
          configSchema: svgFeatureRendererConfigSchema,
        }),
    )
  }
}

class SNPCoverageRendererPlugin extends Plugin {
  install(pluginManager) {
    pluginManager.addRendererType(
      () =>
        new SNPCoverageRenderer({
          name: 'SNPCoverageRenderer',
          ReactComponent: SNPCoverageRendererReactComponent,
          configSchema: snpCoverageRendererConfigSchema,
        }),
    )
  }
}

test('has a viewType attr', () => {
  const configSchema = configSchemaFactory(
    new PluginManager([
      new PileupRendererPlugin(),
      new SvgFeatureRendererPlugin(),
      new SNPCoverageRendererPlugin(),
    ])
      .createPluggableElements()
      .configure(),
  )
  const config = configSchema.create({
    type: 'AlignmentsTrack',
    trackId: 'track0',
    name: 'Zonker Track',
  })

  expect(config.viewType).toEqual('LinearGenomeView')
})
