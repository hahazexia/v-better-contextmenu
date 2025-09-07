import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VBetterContextMenu',
      fileName: format => `v-better-contextmenu.${format}.js`,

      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        banner:
          '/*! v-better-contextmenu - A better contextmenu component for Vue 3 */',
      },
    },
    minify: false,
  },
});
