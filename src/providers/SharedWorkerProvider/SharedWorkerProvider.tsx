// import * as Comlink from 'comlink'
import React from 'react'

import { SharedWorkerFunctionsContext } from './SharedWorkerFunctionsContext'

type SharedWorkerProviderProps = {
  children: React.ReactNode
}

function SharedWorkerProvider({ children }: SharedWorkerProviderProps) {
  const sharedWorker = new ComlinkSharedWorker(
    new URL('./webSocket.shared-worker.ts', import.meta.url)
  )

  // const sharedWorkerFunctions = Comlink.wrap(sharedWorker.port)

  return (
    <SharedWorkerFunctionsContext.Provider value={sharedWorker}>
      {children}
    </SharedWorkerFunctionsContext.Provider>
  )
}

export default SharedWorkerProvider
