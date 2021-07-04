const PI_XBTUSDgroupings = [
    {
        values: [0],
        label: '0.50',
    },
    {
        values: [0.5],
        label: '1',
    },
    {
        values: [0.5, 2],
        label: '2.50',
    },
];

const PI_ETHUSDgroupings = [
    {
        values: [0],
        label: '0.05',
    },
    {
        values: [0.05],
        label: '0.1',
    },
    {
        values: [0.05, 0.2],
        label: '0.25',
    },
];

const productsGroupings = {
    PI_XBTUSD: PI_XBTUSDgroupings,
    PI_ETHUSD: PI_ETHUSDgroupings,
};

export { productsGroupings };
