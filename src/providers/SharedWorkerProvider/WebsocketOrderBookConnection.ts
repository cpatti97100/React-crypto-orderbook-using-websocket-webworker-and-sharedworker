/** @format */

import { OrderBook, Product, TransformDataWorker } from '@src/@types'
import { endpointSymbol } from 'vite-plugin-comlink/symbol'

// import * as Comlink from 'comlink'
import React from 'react'

import { sleep } from './util'

export class WebsocketOrderBookConnection {
  public static url = 'wss://www.cryptofacilities.com/ws/v1'

  readonly product: Product
  readonly bindedMessageHandler: EventListenerOrEventListenerObject

  private callbacks = new Map()

  private ws: WebSocket | null = null
  private worker: Worker | null = null
  private comlinkWorker: TransformDataWorker | null = null

  constructor(product: Product) {
    this.bindedMessageHandler = this.messageHandler.bind(this)
    this.product = product
  }

  public addCallback(
    componentConnectionId: string,
    callback: React.Dispatch<React.SetStateAction<OrderBook>>
  ): void {
    console.debug('Adding callback ID', componentConnectionId)

    this.callbacks.set(componentConnectionId, callback)
    this.ensureConnectionIfNeeded()
  }

  public deleteCallback(componentConnectionId: string): void {
    console.debug('Deleting callback ID', componentConnectionId)

    this.callbacks.delete(componentConnectionId)

    if (this.callbacks.size === 0) {
      this.reset()
    }
  }

  private async ensureConnectionIfNeeded(): Promise<undefined> {
    console.debug('Ensuring active connection')

    if (this.ws !== null) {
      return
    }

    while (this.callbacks.size > 0) {
      try {
        this.connect()

        break
      } catch (error) {
        console.error('Error while connecting', error)

        this.reset()

        await sleep(5000)
      }
    }

    return
  }

  private connect(): void {
    console.debug('Attempting connection')

    this.comlinkWorker = new ComlinkWorker(
      new URL('../../webWorker/transformData.worker.ts', import.meta.url)
    )
    this.worker = this.comlinkWorker[endpointSymbol]

    this.ws = new WebSocket(WebsocketOrderBookConnection.url)

    this.ws.addEventListener('error', (error) => {
      console.error('Connection had an error: ', error)

      this.ws?.close()
    })

    this.ws.addEventListener('close', () => {
      console.error('Connection has been closed')

      this.reset()
    })

    this.ws.addEventListener('message', this.bindedMessageHandler)

    this.ws.addEventListener('open', () => {
      console.debug('Connection opened, subscribing')

      this.ws?.send(
        JSON.stringify({
          event: 'subscribe',
          feed: 'book_ui_1',
          product_ids: [this.product],
        })
      )
    })
  }

  private async reset(): Promise<undefined> {
    console.debug('Resetting connection')

    try {
      this.ws?.removeEventListener('message', this.bindedMessageHandler)
      this.ws?.send(
        JSON.stringify({
          event: 'unsubscribe',
          feed: 'book_ui_1',
          product_ids: [this.product],
        })
      )
      this.ws?.close()
    } finally {
      // where releaseProxy?
      this.worker?.releaseProxy()
      this.worker?.terminate()

      this.ws = null
      this.worker = null
      this.comlinkWorker = null

      await sleep(5000)

      this.ensureConnectionIfNeeded()
    }

    return
  }

  public triggerError(): void {
    this.ws?.dispatchEvent(
      new ErrorEvent('error', {
        error: new Error(
          'All good, we did it on purpose. Nothing to worry about really, connection will be back soon'
        ),
      })
    )
  }

  private async messageHandler(message: any) {
    if (this.comlinkWorker) {
      const componentValues: OrderBook =
        await this.comlinkWorker.computeComponentValues(message.data as string)
      const callbacks: Array<React.Dispatch<React.SetStateAction<OrderBook>>> =
        Array.from(this.callbacks.values())
      const callbacksPromises: Array<void> = callbacks.map((callback) =>
        callback(componentValues)
      )

      await Promise.all(callbacksPromises)
    }
  }
}
