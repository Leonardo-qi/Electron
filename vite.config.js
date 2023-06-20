import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'



// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://172.17.17.81:10205',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue()],
})
