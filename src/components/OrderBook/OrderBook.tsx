import { Product } from '@src/@types'

import cn from 'classnames'
import { useRef, useState } from 'react'

import { OrderBookHeader } from '../OrderBookHeader'
import { OrderBookPanel } from '../OrderBookPanel'
import { productsGroupings } from '../constants'
import { useOrderBookResize, useWorkerData } from './hooks'
import { orderBookContainer } from './orderBook.module.scss'
import { getGroupedOrderBook } from './util'

function OrderBook() {
  const [groupingValues, setGroupingValues] = useState(
    productsGroupings.PI_XBTUSD[0].values
  )

  const [product, setProduct] = useState<Product>(Product.PI_XBTUSD)

  const orderBook = useWorkerData(product)
  const groupedOrderBook = getGroupedOrderBook(orderBook, groupingValues)
  const orderBookRef = useRef<HTMLDivElement>(null)
  const isMobileView = useOrderBookResize(orderBookRef)

  return (
    <section>
      <OrderBookHeader
        product={product}
        setProduct={setProduct}
        groupingValues={groupingValues}
        setGroupingValues={setGroupingValues}
      />
      <div
        className={cn(orderBookContainer)}
        ref={orderBookRef}
      >
        <OrderBookPanel
          isMobileView={isMobileView}
          theme='red'
          groupedValues={groupedOrderBook.groupedAsks}
        />
        <OrderBookPanel
          isMobileView={isMobileView}
          theme='green'
          groupedValues={groupedOrderBook.groupedBids}
        />
      </div>
    </section>
  )
}

export default OrderBook
