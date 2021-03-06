import { ConfigurationSchema } from '@gmod/jbrowse-core/configuration'
import { BaseTrackConfig } from '@gmod/jbrowse-plugin-linear-genome-view'
import { types } from 'mobx-state-tree'
import PluginManager from '@gmod/jbrowse-core/PluginManager'

const configModelFactory = (pluginManager: PluginManager) => {
  const PileupRendererConfigSchema = pluginManager.getRendererType(
    'PileupRenderer',
  ).configSchema
  const SvgFeatureRendererConfigSchema = pluginManager.getRendererType(
    'SvgFeatureRenderer',
  ).configSchema
  const SNPCoverageRendererConfigSchema = pluginManager.getRendererType(
    'SNPCoverageRenderer',
  ).configSchema

  return ConfigurationSchema(
    'AlignmentsTrack',
    {
      autoscale: {
        type: 'stringEnum',
        defaultValue: 'local',
        model: types.enumeration('Autoscale type', ['local']),
        description: 'performs SNP Coverage local autoscaling',
      },
      minScore: {
        type: 'number',
        defaultValue: Number.MIN_VALUE,
        description: 'minimum value for the SNP coverage y-scale',
      },
      maxScore: {
        type: 'number',
        description: 'maximum value for the SNP coverage y-scale',
        defaultValue: Number.MAX_VALUE,
      },
      maxDisplayedBpPerPx: {
        type: 'number',
        description: 'maximum bpPerPx that is displayed in the view',
        defaultValue: 100,
      },
      scaleType: {
        type: 'stringEnum',
        model: types.enumeration('Scale type', ['linear', 'log']),
        description: 'The type of scale to use for SNP coverage',
        defaultValue: 'linear',
      },
      headroom: {
        type: 'number',
        description:
          'round the upper value of the SNP coverage domain scale to the nearest N',
        defaultValue: 20,
      },
      adapter: pluginManager.pluggableConfigSchemaType('adapter'),
      defaultRendering: {
        type: 'stringEnum',
        model: types.enumeration('Rendering', ['pileup', 'svg']),
        defaultValue: 'pileup',
      },
      renderers: ConfigurationSchema('RenderersConfiguration', {
        PileupRenderer: PileupRendererConfigSchema,
        SvgFeatureRenderer: SvgFeatureRendererConfigSchema,
        SNPCoverageRenderer: SNPCoverageRendererConfigSchema,
      }),
    },
    { baseConfiguration: BaseTrackConfig, explicitlyTyped: true },
  )
}

export type AlignmentsConfigModel = ReturnType<typeof configModelFactory>
export default configModelFactory
