import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import createImportPlugin from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createImportPlugin({
      /* options */
    }),
  ],
  server: {
    host: '127.0.0.1'
  }
});
