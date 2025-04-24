Good day and thank you for checking out my crypto orderbook :)

Live link (Firefox only): [https://react-crypto-orderbook-using-websocket-webworker-an-cpatti97100.vercel.app/](https://react-crypto-orderbook-using-websocket-webworker-tbr3ente0.vercel.app/)

Get Firefox: https://www.mozilla.org/en-US/firefox/new/

**Screenshot** ![Screenshot](https://i.ibb.co/wsb5pSD/Screenshot-2021-07-04-at-14-13-28.png)

## Here are few important notes:

This code is not for production use and only runs on Firefox due to SharedWorker and WebWorker specific features browser support.

I honestly just had so much fun playing with those that I could not resist going all in :)

For a real world application I would rely on a different setup, although less optimal probably.

## Features

- It shares one WebSocket connection with multiple component instances and/or tabs. No matter how many, there will always be only one connection.
- It uses at most 2 WebWorkers, one for every currently displayed product.
- Component updates are throttled no matter the message frequency from the WebSocket
- Fully responsive

## Performance

**Memory usage in time** ![memory usage](https://i.ibb.co/qjhL4qQ/Screenshot-2021-07-04-at-14-15-51.png)

Absolutely stable

**Firefox Profiler** ![Firefox profiler](https://i.ibb.co/DK87DW7/Screenshot-2021-07-04-at-14-08-36.png)

Very lightweight on the CPU

**React Profiler** ![react profiler](https://i.ibb.co/hcQ4FCc/Screenshot-2021-07-04-at-14-20-05.png)

**dev build** rendering times

## Improvements

- Tests
- SharedWorker is currently not supported in safari, but it is again under consideration (https://bugs.webkit.org/show_bug.cgi?id=149850)
- SharedWorker cannot spin up WebWorker in Chrome
- I used HTML tables and SVG as they are accessible and in theory the right tool for the job.
- Naming of CSS classes and variables in general
- ...many more, software is a never ending journey :D

## Next ideas

- I am very familiar with RxJS, and it would have probably be a nice fit here

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
