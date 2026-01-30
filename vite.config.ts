import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/melissa-business-directory/', // <-- repo name, with leading & trailing slash
})
