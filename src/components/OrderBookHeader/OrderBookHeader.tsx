import { Product } from '@src/@types'
import { SharedWorkerFunctionsContext } from '@src/providers'

import cn from 'classnames'
import React, { ChangeEvent, useContext, useState } from 'react'

import { productsGroupings } from '../constants'
import {
  button,
  header,
  kill,
  select,
  toggle,
} from './orderBookHeader.module.scss'

type OrderBookHeaderProps = {
  product: Product
  setProduct: React.Dispatch<React.SetStateAction<Product>>
  groupingValues: number[]
  setGroupingValues: React.Dispatch<React.SetStateAction<number[]>>
}

function OrderBookHeader({
  product,
  setProduct,
  // groupingValues,
  setGroupingValues,
}: OrderBookHeaderProps) {
  const sharedWorkerFunctions = useContext(SharedWorkerFunctionsContext)

  const [groupingIndex, setGroupingIndex] = useState(0)

  const [groupingOptions, setGroupingOptions] = useState(
    productsGroupings.PI_XBTUSD
  )

  const killFeed = () => {
    sharedWorkerFunctions.triggerError()
  }

  const switchProduct = () => {
    console.debug('OrderBookHeader 42', product)
    const nextProduct =
      product === Product.PI_XBTUSD ? Product.PI_ETHUSD : Product.PI_XBTUSD

    setProduct(nextProduct)
    setGroupingOptions(productsGroupings[nextProduct])
    setGroupingIndex(0)
  }

  const updateGrouping = (event: ChangeEvent) => {
    const element = event.target as HTMLSelectElement
    const newGroupingIndex = parseInt(element.value, 10)

    setGroupingIndex(newGroupingIndex)
    setGroupingValues(productsGroupings[product][newGroupingIndex].values)
  }

  return (
    <header className={header}>
      <h1>Order Book</h1>

      <div>
        <button
          type='button'
          className={cn(button, toggle)}
          onClick={switchProduct}
        >
          Toggle Feed
        </button>
        <button
          type='button'
          className={cn(button, kill)}
          onClick={killFeed}
        >
          Kill Feed
        </button>
      </div>
      <select
        className={select}
        value={groupingIndex}
        onChange={updateGrouping}
      >
        {groupingOptions.map((groupingOption, groupingOptionIndex) => (
          <option
            key={groupingOptionIndex}
            value={groupingOptionIndex}
          >
            {groupingOption.label}
          </option>
        ))}
      </select>
    </header>
  )
}

export default OrderBookHeader
