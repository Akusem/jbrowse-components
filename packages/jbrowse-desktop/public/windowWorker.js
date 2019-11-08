const { electronBetterIpc, rpcMethods, rpcStuff, electron } = window

const { ipcRenderer } = electronBetterIpc

const {
  useStaticRendering,
  PluginManager,
  remoteAbortRpcHandler,
  isAbortException,
  corePlugins,
} = rpcStuff

// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(true)

let mainWindow

// eslint-disable-next-line no-console
const originalConsoleLog = console.log.bind(console)
// eslint-disable-next-line no-console
console.log = async (...args) => {
  if (!mainWindow) {
    const mainWindowId = await ipcRenderer.invoke('getMainWindowId')
    mainWindow = electron.remote.BrowserWindow.fromId(mainWindowId)
  }
  ipcRenderer.sendTo(mainWindow.webContents.id, 'consoleLog', ...args)
  originalConsoleLog(...args)
}

const originalConsoleWarn = console.warn.bind(console)
console.warn = async (...args) => {
  if (!mainWindow) {
    const mainWindowId = await ipcRenderer.invoke('getMainWindowId')
    mainWindow = electron.remote.BrowserWindow.fromId(mainWindowId)
  }
  ipcRenderer.sendTo(mainWindow.webContents.id, 'consoleWarn', ...args)
  originalConsoleWarn(...args)
}

const originalConsoleError = console.error.bind(console)
console.error = async (...args) => {
  if (!mainWindow) {
    const mainWindowId = await ipcRenderer.invoke('getMainWindowId')
    mainWindow = electron.remote.BrowserWindow.fromId(mainWindowId)
  }
  ipcRenderer.sendTo(mainWindow.webContents.id, 'consoleError', ...args)
  originalConsoleError(...args)
}

const jbPluginManager = new PluginManager(corePlugins.map(P => new P()))
jbPluginManager.configure()

const logBuffer = []
function flushLog() {
  if (logBuffer.length) {
    for (const l of logBuffer) {
      const [head, ...rest] = l
      if (head === 'rpc-error') {
        // console.error(head, ...rest)
      } else {
        // eslint-disable-next-line no-console
        console.log(head, ...rest)
      }
    }
    logBuffer.length = 0
  }
}
setInterval(flushLog, 1000)

let callCounter = 0
function wrapForRpc(func) {
  return args => {
    callCounter += 1
    const myId = callCounter
    // logBuffer.push(['rpc-call', myId, func.name, args])
    const retP = Promise.resolve()
      .then(() => func(jbPluginManager, args))
      .catch(error => {
        if (isAbortException(error)) {
          // logBuffer.push(['rpc-abort', myId, func.name, args])
        } else {
          logBuffer.push(['rpc-error', myId, func.name, error])
          flushLog()
        }
        throw error
      })

    // uncomment below to log returns
    // retP.then(
    //   result => logBuffer.push(['rpc-return', myId, func.name, result]),
    //   err => {},
    // )

    return retP
  }
}

const wrappedRpcMethods = {}

Object.keys(rpcMethods).forEach(key => {
  wrappedRpcMethods[key] = wrapForRpc(rpcMethods[key])
})

ipcRenderer.answerRenderer('ready', async () => true)

ipcRenderer.answerRenderer('call', async (functionName, args /* , opts */) => {
  // TODO: implement opts.timeout
  return { ...wrappedRpcMethods, ...remoteAbortRpcHandler(), ping: () => {} }[
    functionName
  ](args)
})
