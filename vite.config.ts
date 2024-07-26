import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

const framework = process.env.VITE_FRAMEWORK || 'vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    framework === 'vuetify' ? vuetify({ autoImport: true }) : undefined
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src'),
    }
  },
  server: {
    host: 'localhost',
    port: 6983,
  },
  optimizeDeps: {
    include: ['vue', 'vuetify', 'bootstrap', 'tailwindcss']
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      name: 'vue-telify',
      fileName: (format) => `vue-telify.${format}.js`,
      formats: ['es', 'umd']
    },
    // rollupOptions: {
    //   input: path.resolve(__dirname, 'src/index.ts'),
    //   external: ['vue'],
    //   output: {
    //     globals: {
    //       vue: 'Vue'
    //     }
    //   }
    // },
    // commonjsOptions: {
    //   include: "/nodes_modules/"
    // }
  }
})
