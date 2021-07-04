import {
    OrderBookData,
    OrderBook,
    OrderBookDataArray,
    OrderBookDeltas,
    OrderBookEntries,
    WebSocketMessageData,
} from '@src/@types';

import * as Comlink from 'comlink';

const bidsMap: OrderBookData = new Map();
const asksMap: OrderBookData = new Map();

const updateOrderBookEntriesBars = (
    orderBookEntries: OrderBookEntries,
    maxSizeTotal: number,
) => {
    orderBookEntries.forEach((orderBookEntry) => {
        orderBookEntry.barWidth = (orderBookEntry.total * 100) / maxSizeTotal;
    });
};

const updateOrderBookEntries = (
    oldEntries: OrderBookData,
    newEntries: OrderBookDeltas,
) => {
    newEntries.forEach(([price, size]) => {
        if (size === 0) {
            oldEntries.delete(price);

            return;
        }

        oldEntries.set(price, size);
    });
};

const sortOrderBookData = (orderBookData: OrderBookDataArray) => {
    return orderBookData.sort(
        ([orderBookPrice], [compareOrderBookPrice]) =>
            orderBookPrice - compareOrderBookPrice,
    );
};

const getOrderBookEntries = (orderBookData: OrderBookDataArray) => {
    return orderBookData.reduce(
        (
            orderBookEntriesAccumulator,
            [orderBookDataPrice, orderBookDataSize],
            orderBookDataIndex,
        ) => {
            const previousLevel =
                orderBookEntriesAccumulator[orderBookDataIndex - 1] ?? null;
            const previousTotal = previousLevel?.total ?? 0;

            const price = orderBookDataPrice;
            const size = orderBookDataSize;
            const total = orderBookDataSize + previousTotal;

            orderBookEntriesAccumulator.push({
                total,
                size,
                price,
                barWidth: 0,
            });

            return orderBookEntriesAccumulator;
        },
        [] as OrderBookEntries,
    );
};

function computeComponentValues(data: string): OrderBook {
    try {
        const dataObj: WebSocketMessageData = JSON.parse(data);
        const { bids: newBids, asks: newAsks } = dataObj;

        updateOrderBookEntries(asksMap, newBids);
        updateOrderBookEntries(bidsMap, newAsks);
    } catch (error) {
        console.warn(
            'The data from the network has unexpected shape or this was not a delta message (possibly one of the first messages). Returning last valid values. Warning: ',
            error,
        );
    } finally {
        const asksArray: OrderBookDataArray = Array.from(asksMap);
        const bidsArray: OrderBookDataArray = Array.from(bidsMap);

        const asksSortedArray = sortOrderBookData(asksArray);
        const bidsSortedArray = sortOrderBookData(bidsArray);

        const asks = getOrderBookEntries(asksSortedArray);
        const bids = getOrderBookEntries(bidsSortedArray);

        const maxSizeTotal = Math.max(
            ...[...asks, ...bids].map(({ total }) => total),
        );

        updateOrderBookEntriesBars(asks, maxSizeTotal);
        updateOrderBookEntriesBars(bids, maxSizeTotal);

        return { asks, bids, maxSizeTotal };
    }
}

const workerFunctions = {
    computeComponentValues,
};

Comlink.expose(workerFunctions);
