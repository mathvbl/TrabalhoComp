import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/server': {
        target: 'http://localhost:3000', // Altere para a porta do seu backend se for diferente
        changeOrigin: true,
      }
    }
  }
});
