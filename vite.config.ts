import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { comlink } from 'vite-plugin-comlink'

// https://vite.dev/config/
export default defineConfig({
  plugins: [comlink(), react()],
  worker: {
    plugins: () => [comlink()],
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
})
