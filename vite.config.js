import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Forward API calls to the Express backend so the frontend can use
    // same-origin paths like fetch('/api/products') with no CORS setup.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
