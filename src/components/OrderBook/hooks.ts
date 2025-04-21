/** @format */

import { OrderBook, Product } from '@src/@types'
import { SharedWorkerFunctionsContext } from '@src/providers'

import * as Comlink from 'comlink'
import { debounce, throttle } from 'lodash'
import { nanoid } from 'nanoid'
import { RefObject, useContext, useEffect, useState } from 'react'

const useWorkerData = (product: Product): OrderBook => {
  const sharedWorkerFunctions = useContext(SharedWorkerFunctionsContext)
  const [orderBook, setOrderBook] = useState<OrderBook>({
    asks: [],
    bids: [],
    maxSizeTotal: 0,
  })

  useEffect(() => {
    const throttledSetOrderBook = throttle((orderBook: OrderBook) => {
      setOrderBook(orderBook)
    }, 2000)

    const proxiedSetOrderBook = Comlink.proxy(throttledSetOrderBook)

    const connectionID = nanoid()

    sharedWorkerFunctions.connectComponent(
      product,
      connectionID,
      proxiedSetOrderBook
    )

    const disconnectComponent = () => {
      sharedWorkerFunctions.disconnectComponent(product, connectionID)
      throttledSetOrderBook.cancel()
    }

    window.addEventListener('pagehide', disconnectComponent)

    return () => {
      window.removeEventListener('pagehide', disconnectComponent)
      disconnectComponent()
    }
  }, [product])

  return orderBook
}

const useOrderBookResize = (
  orderBookRef: RefObject<HTMLDivElement>
): boolean => {
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const orderBookEl = orderBookRef.current
    const handleResize = debounce((entries: Array<ResizeObserverEntry>) => {
      const { width } = entries[0].contentRect

      setIsMobileView(width < 600)
    }, 250)

    const resizeObserver = new ResizeObserver(handleResize)

    if (orderBookEl) {
      resizeObserver.observe(orderBookEl)

      return () => {
        resizeObserver.disconnect()
        handleResize.cancel()
      }
    }

    return
  }, [orderBookRef])

  return isMobileView
}

export { useWorkerData, useOrderBookResize }
