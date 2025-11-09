import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
  ],
  // build kept trying to import process.env, fix:
  define: {
    'process.env.NODE_ENV' : JSON.stringify('production'),
  },
  build: {
    // Build as library (because this will be injected in to immoweb)
    lib: {
      entry: 'src/main.js',
      name: 'VSToolbox',
      formats: ['iife'],
      fileName: () => 'app.js',
    },

    // Always curious to see how it gets built, so:
    minify: false,

    // For obvious reasons, no code-splitting:
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
  }
})