import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'resources/js/widget.tsx'),
      name: 'DialNSoftphone',
      fileName: (format) => `softphone.${format}.js`,
      formats: ['umd', 'es'],
      cssFileName: 'softphone',
    },
    rollupOptions: {
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: 'softphone.[ext]',
      },
    },
    outDir: 'public/widget',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'terser',
    cssCodeSplit: false,
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for debugging
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
