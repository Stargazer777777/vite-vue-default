import { UserConfig, defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import postcssPresetEnv from 'postcss-preset-env';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  let viteConfig: UserConfig = {
    base: '/',
    plugins: [
      vue(),
      vueJsx(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      postcss: {
        plugins: [postcssPresetEnv()],
      },
      devSourcemap: true,
    },
    server: {
      proxy: {
        '/api': {
          // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
          target: 'http://127.0.0.1:3000', // 目标地址 --> 服务器地址
          changeOrigin: true, // 允许跨域,
          ws: true, // 允许websocket代理
          // 重写路径 --> 作用与vue配置pathRewrite作用相同
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
  if (command === 'serve') {
    viteConfig = {
      ...viteConfig,
    };
  }
  if (command === 'build') {
    viteConfig = {
      ...viteConfig,
    };
  }
  return viteConfig;
});
