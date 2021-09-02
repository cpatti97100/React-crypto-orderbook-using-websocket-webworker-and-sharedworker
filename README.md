Good day and thank you for checking out my crypto orderbook :)

Live link (Firefox only): https://react-crypto-orderbook-using-websocket-webworker-and-sharedworker.vercel.app

Get Firefox: https://www.mozilla.org/en-US/firefox/new/

**Screenshot**
![Screenshot](https://i.ibb.co/wsb5pSD/Screenshot-2021-07-04-at-14-13-28.png)

## Here are few important notes:

This repository is a fork of https://github.com/glook/webpack-typescript-react (base react + webpack 5 boilerplate, see below)

This code is not for production use and only runs on Firefox due to SharedWorker and WebWorker specific features browser support.

I honestly just had so much fun playing with those that I could not resist going all in :)

For a real world application I would rely on a different setup, although less optimal probably.

## Features

-   It shares one WebSocket connection with multiple component instances and/or tabs. No matter how many, there will always be only one connection.
-   It uses at most 2 WebWorkers, one for every currently displayed product.
-   Component updates are throttled no matter the message frequency from the WebSocket
-   Fully responsive

## Performance

**Memory usage in time**
![memory usage](https://i.ibb.co/qjhL4qQ/Screenshot-2021-07-04-at-14-15-51.png)

Absolutely stable

**Firefox Profiler**
![Firefox profiler](https://i.ibb.co/DK87DW7/Screenshot-2021-07-04-at-14-08-36.png)

Very lightweight on the CPU

**React Profiler**
![react profiler](https://i.ibb.co/hcQ4FCc/Screenshot-2021-07-04-at-14-20-05.png)

**dev build** rendering times

## Improvements

-   Tests
-   SharedWorker is currently not supported in safari, but it is again under consideration
    (https://bugs.webkit.org/show_bug.cgi?id=149850)
-   SharedWorker cannot spin up WebWorker in Chrome
-   I used HTML tables and SVG as they are accessible and in theory the right tool for the job.
-   Naming of CSS classes and variables in general
-   ...many more, software is a never ending journey :D

## Next ideas

-   I am very familiar with RxJS, and it would have probably be a nice fit here


# Webpack 5 boilerplate

![](https://habrastorage.org/webt/q-/lv/b0/q-lvb0d4li7cpi-hsctistlzooi.png)
[Webpack 5](https://webpack.js.org/) boilerplate with support of most common loaders and modules:

-   [babel](https://babeljs.io/)

-   typescript (using [ForkTsCheckerWebpack](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin) )

-   sass, less, [css modules](https://github.com/css-modules/css-modules) with automatic typescript declaration

-   with react support (also with [react-refresh](https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin))

-   [esLint](https://www.npmjs.com/package/eslint)

-   [prettier](https://www.npmjs.com/package/prettier) (with import sorting using [prettier-plugin-import-sort](https://www.npmjs.com/package/prettier-plugin-import-sort), [import-sort-style-module-and-prefix](https://www.npmjs.com/package/import-sort-style-module-and-prefix))

-   [webpack dev server](https://webpack.js.org/configuration/dev-server/) ([proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy) support is also available)

-   importing svg as react components using [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack)

-   postcss loader (with [autoprefixer](https://www.npmjs.com/package/autoprefixer) and [cssnano](https://www.npmjs.com/package/cssnano))

-   [husky](https://www.npmjs.com/package/husky) prehooks and [lint-staged](https://www.npmjs.com/package/lint-staged)

## Quick start

To run this locally:

1. run `git clone https://github.com/glook/webpack-typescript-react.git sample-project`

2. Install all dependencies using `yarn` or `npm install`

3. Start the development server using `yarn start` or `npm run start`

4. Open up [http://localhost:8080](http://localhost:8080)
