import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import phaserAssetsRollupPlugin from 'phaser-assets-loader/plugins/rollupPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    phaserAssetsRollupPlugin({
      patterns: [
        { type: 'image', prefix: '', dir: '/img', rule: /^\w+\.png$/ },
        { type: 'image', prefix: '', dir: '/img', rule: /^\w+\.jpg$/ }
      ],
      output: 'src/assets.json'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
