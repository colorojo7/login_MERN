import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import api from '../shared/api.directory'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [react()],
})
