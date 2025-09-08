import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,   // Tự mở browser khi chạy npm run dev
    port: 3000   // Cố định port (đỡ bị đổi lung tung)
  },
  build: {
    sourcemap: false, // Tắt sourcemap để build nhanh hơn
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Pre-bundle React để start nhanh hơn
  },
})
