/** @format */

import {
  GroupedOrderBook,
  GroupingValues,
  OrderBook,
  OrderBookEntries,
  OrderBookEntry,
} from '@src/@types'

const getGroupedOrderBookEntries = (
  orderBookEntries: OrderBookEntries,
  maxSizeTotal: number,
  groupingValues: GroupingValues
) => {
  const groupedOrderBookEntries = orderBookEntries.reduce(
    (
      groupedOrderBookEntriesAccumulator: OrderBookEntries,
      { price, size }: OrderBookEntry
    ) => {
      const previousLevel =
        groupedOrderBookEntriesAccumulator[
          groupedOrderBookEntriesAccumulator.length - 1
        ] ?? null
      const previousPrice = previousLevel?.price ?? 0
      const previousTotal = previousLevel?.total ?? 0

      const some = groupingValues.map((groupingValue) => price - groupingValue)

      if (some.includes(previousPrice)) {
        const previousSize = previousLevel?.size ?? 0

        previousLevel.size = previousSize + size
        previousLevel.total = previousTotal + size
        previousLevel.barWidth = Math.ceil(
          (previousLevel.total * 100) / maxSizeTotal
        )

        return groupedOrderBookEntriesAccumulator
      }

      const total = size + previousTotal

      groupedOrderBookEntriesAccumulator.push({
        total,
        size,
        price,
        barWidth: Math.ceil((total * 100) / maxSizeTotal),
      })

      return groupedOrderBookEntriesAccumulator
    },
    []
  )

  return groupedOrderBookEntries
}

const getGroupedOrderBook = (
  { asks, bids, maxSizeTotal }: OrderBook,
  groupingValues: GroupingValues
): GroupedOrderBook => {
  const groupedAsks = getGroupedOrderBookEntries(
    asks,
    maxSizeTotal,
    groupingValues
  )
  const groupedBids = getGroupedOrderBookEntries(
    bids,
    maxSizeTotal,
    groupingValues
  )

  return {
    groupedAsks,
    groupedBids,
  }
}

export { getGroupedOrderBook }
