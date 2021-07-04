import { SharedWorkerProvider } from '@src/providers';

import React from 'react';

import OrderBook from '../OrderBook';
import { main } from './app.module.scss';

function App() {
    return (
        <main className={main}>
            <SharedWorkerProvider>
                <OrderBook />
                {/* <OrderBook /> */}
                {/* <OrderBook /> */}
                {/* <OrderBook /> */}
            </SharedWorkerProvider>
        </main>
    );
}

export default App;
