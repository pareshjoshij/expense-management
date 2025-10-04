import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This section tells the Vite dev server to forward API requests
  server: {
    proxy: {
      // Any request starting with /api will be sent to the backend
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true, // Recommended setting
      },
    },
  },
});

