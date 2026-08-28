import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.js',
        globalsPropValue: 'readonly',
      },
      imports: ['vue', 'vue-router'],
    }),

    // https://github.com/unplugin/unplugin-vue-components
    Components({
      globs: ['src/components/*/index.vue', 'src/components/*.vue'],
    }),

    // https://tailwindcss.com/docs/installation/using-vite
    tailwindcss(),

    vue(),
    vueDevTools(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/prod-api': {
        target: 'https://vue.ruoyi.vip',
        changeOrigin: true,
      },
    },
  },
});
