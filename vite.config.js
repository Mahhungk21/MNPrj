import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(),],
  server: {
    cors: {
      origin: '*',  // Allow all origins
      methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
      allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    }
  }
})
