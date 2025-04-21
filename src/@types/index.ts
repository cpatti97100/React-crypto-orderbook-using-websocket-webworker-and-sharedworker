import * as Comlink from 'comlink'

export enum Product {
  PI_XBTUSD = 'PI_XBTUSD',
  PI_ETHUSD = 'PI_ETHUSD',
}

export type GroupingValues = Array<number>

export type OrderBookEntry = {
  price: number
  size: number
  barWidth: number
  total: number
}

export type OrderBookEntries = Array<OrderBookEntry>

export type OrderBook = {
  asks: OrderBookEntries
  bids: OrderBookEntries
  maxSizeTotal: number
}

export type GroupedOrderBook = {
  groupedAsks: OrderBookEntries
  groupedBids: OrderBookEntries
}

export type OrderBookData = Map<number, number>

export type OrderBookDataArray = Array<[number, number]>

export type OrderBookDeltas = Array<[number, number]>

export type WebSocketMessageData = {
  asks: OrderBookDeltas
  bids: OrderBookDeltas
}

export type TransformDataWorker = Comlink.Remote<WorkerType> & {
  computeComponentValues: (data: string) => OrderBook
}
