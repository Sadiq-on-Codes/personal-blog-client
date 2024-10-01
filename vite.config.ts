import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Uncomment the next line if you want to use Vue DevTools
    // vueDevTools(),
  ],
  assetsInclude: ['**/*.JPEG', '**/*.jpeg', '**/*.png', '**/*.jpg'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',  
    port: 5173,       
  }
});
