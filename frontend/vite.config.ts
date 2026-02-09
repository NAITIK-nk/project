import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Proxy API requests to the backend running on port 5000
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
