/** @format */

import { OrderBook, Product } from '@src/@types'

import * as Comlink from 'comlink'
import React from 'react'

import { WebsocketOrderBookConnection } from './WebsocketOrderBookConnection'

const websocketOrderBookConnections: Record<
  Product,
  WebsocketOrderBookConnection
> = {
  PI_XBTUSD: new WebsocketOrderBookConnection(Product.PI_XBTUSD),
  PI_ETHUSD: new WebsocketOrderBookConnection(Product.PI_ETHUSD),
}

function connectComponent(
  product: Product,
  connectionID: string,
  proxiedSetOrderBook: React.Dispatch<React.SetStateAction<OrderBook>>
) {
  const websocketOrderBookConnection = websocketOrderBookConnections[product]

  websocketOrderBookConnection.addCallback(connectionID, proxiedSetOrderBook)
}

function disconnectComponent(product: Product, connectionID: string) {
  const websocketOrderBookConnection = websocketOrderBookConnections[product]

  websocketOrderBookConnection.deleteCallback(connectionID)
}

function triggerError() {
  Object.keys(websocketOrderBookConnections).forEach((product: Product) => {
    websocketOrderBookConnections[product].triggerError()
  })
}

const sharedWorkerFunctions = {
  connectComponent,
  disconnectComponent,
  triggerError,
}

;(self as unknown as SharedWorker.SharedWorkerGlobalScope).onconnect =
  function (event: MessageEvent) {
    const port = event.ports[0]

    Comlink.expose(sharedWorkerFunctions, port)
  }
