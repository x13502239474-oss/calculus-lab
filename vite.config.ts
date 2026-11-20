import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 使用 HashRouter，静态资源相对路径，兼容 GitHub Pages 子路径部署
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('plotly.js')) return 'plotly';
          if (id.includes('katex')) return 'katex';
          if (id.includes('mathjs')) return 'mathjs';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
});
