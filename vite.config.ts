import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  envPrefix: ['VITE_', 'OPENAI_'],
  plugins: [react()],
  server: {
    proxy: {
      '/openai': {
        target: 'https://api.openai.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/openai/, '/v1'),
      },
    },
  },
})
