import { checkAbortSignal } from '@gmod/jbrowse-core/util'
import { getAdapter } from '@gmod/jbrowse-core/data_adapters/dataAdapterCache'
import {
  deserializeAbortSignal,
  isRemoteAbortSignal,
} from '@gmod/jbrowse-core/rpc/remoteAbortSignals'

/**
 * call a renderer with the given args
 * @param {PluginManager} pluginManager
 * @param {object} args
 * @param {object} args.regions - array of regions to render. some renderers (such as circular chord tracks) accept multiple at a time
 * @param {string} args.sessionId
 * @param {string} args.adapterType
 * @param {object} args.adapterConfig
 * @param {string} args.rendererType
 * @param {object} args.renderProps
 * @param {AbortSignal} [args.signal]
 */
export async function render(
  pluginManager,
  {
    regions,
    originalRegions,
    sessionId,
    adapterType,
    adapterConfig,
    rendererType,
    renderProps,
    signal,
  },
) {
  if (!sessionId) {
    throw new Error('must pass a unique session id')
  }

  if (isRemoteAbortSignal(signal)) {
    signal = deserializeAbortSignal(signal)
  }
  checkAbortSignal(signal)

  const { dataAdapter } = getAdapter(
    pluginManager,
    sessionId,
    adapterType,
    adapterConfig,
  )

  const RendererType = pluginManager.getRendererType(rendererType)
  if (!RendererType) throw new Error(`renderer "${rendererType}" not found`)
  if (!RendererType.ReactComponent)
    throw new Error(
      `renderer ${rendererType} has no ReactComponent, it may not be completely implemented yet`,
    )

  const result = await RendererType.renderInWorker({
    ...renderProps,
    sessionId,
    dataAdapter,
    regions,
    originalRegions,
    signal,
  })
  checkAbortSignal(signal)
  return result
}

/**
 * call a synteny renderer with the given args
 * param views: a set of views that each contain a set of regions
 * used instead of passing regions directly as in render()
 */
export async function comparativeRender(
  pluginManager,
  { sessionId, adapterType, adapterConfig, rendererType, renderProps, signal },
) {
  if (!sessionId) throw new Error('must pass a unique session id')

  if (isRemoteAbortSignal(signal)) {
    signal = deserializeAbortSignal(signal)
  }
  checkAbortSignal(signal)

  const { dataAdapter } = getAdapter(
    pluginManager,
    sessionId,
    adapterType,
    adapterConfig,
  )

  const RendererType = pluginManager.getRendererType(rendererType)

  if (!RendererType) {
    throw new Error(`renderer "${rendererType}" not found`)
  }
  if (!RendererType.ReactComponent) {
    throw new Error(
      `renderer ${rendererType} has no ReactComponent, it may not be completely implemented yet`,
    )
  }

  const result = await RendererType.renderInWorker({
    ...renderProps,
    pluginManager,
    sessionId,
    dataAdapter,
    signal,
  })
  checkAbortSignal(signal)
  return result
}
