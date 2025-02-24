import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      bundledPackages: ['zustand'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'ReactD3Charts',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'd3', 'zustand', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          d3: 'd3',
          zustand: 'zustand',
          'lucide-react': 'lucide-react',
        },
        preserveModules: true,
        preserveModulesRoot: 'src/lib',
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
});