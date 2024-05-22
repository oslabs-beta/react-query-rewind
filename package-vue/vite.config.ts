import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // Import the 'path' module
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueQueryRewind',
      fileName: format => `VueQueryRewind.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named', // Specify export mode to 'named'
      },
    },
  },
  plugins: [vue(), dts({ rollupTypes: true })],
});
