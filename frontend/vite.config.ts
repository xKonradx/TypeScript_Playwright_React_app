// Add Node.js types for process.env
/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...(process.env.ANALYZE === 'true'
      ? [visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: 'dist/bundle-analysis.html',
        })]
      : [])
  ],
})
