import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Components': path.resolve(__dirname, './src/components'),
      '@Pages': path.resolve(__dirname, './src/Pages'),
      '@Assets': path.resolve(__dirname, './src/assets'),
      '@Api': path.resolve(__dirname, './src/Api'),
      '@Context': path.resolve(__dirname, './src/Context'),
    }
  }
})