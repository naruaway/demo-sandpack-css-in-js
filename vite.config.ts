import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import KumaUI from '@kuma-ui/vite'

export default defineConfig({
  base: '/demo-sandpack-css-in-js/',
  plugins: [react(), KumaUI()],
})
