import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  plugins: [react(), babel({
    babelConfig: {
      configFile: true,
    }
  })],
  css: {
    preprocessorOptions: {
      less: {

      }
    }
  },
  server: {
    port: 5173,
    host: '0.0.0.0'
  }
})
