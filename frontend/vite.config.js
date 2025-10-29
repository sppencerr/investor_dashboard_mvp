import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // optional if you proxy backend:
  // server: { proxy: { '/api': 'http://localhost:8080' } }
})
