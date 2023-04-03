import { resolve } from 'path';
import eslint from 'vite-plugin-eslint';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const checkFileNames = ({ name }) => {

  if (/^emoji/.test(name ?? '')) return 'assets/images/emoji/[name]-[hash][extname]';

  if (/\.(jpe?g|png|webp)/.test(name ?? '')) return 'assets/images/[name]-[hash][extname]';

  if (/\.(woff|woff2)/.test(name ?? '')) return 'assets/fonts/[name]-[hash][extname]';

  if (/\.(svg)/.test(name ?? '')) return 'assets/images/svg/[name]-[hash][extname]';

  return 'assets/[name]-[hash][extname]';
}

const aliasesList = [
  { find: '@', replacement: resolve(__dirname, './src') },
  { find: '@utils', replacement: resolve(__dirname, './src/js/utils') },
  { find: '@mocks', replacement: resolve(__dirname, './src/js/mocks') },
  { find: '@model', replacement: resolve(__dirname, './src/js/model') },
  { find: '@view', replacement: resolve(__dirname, './src/js/view') },
  { find: '@presenter', replacement: resolve(__dirname, './src/js/presenter') },
];

const aliasesListNew = {
  '@': resolve(__dirname, './src'),
  '@utils': resolve(__dirname, './src/js/utils'),
  '@mocks': resolve(__dirname, './src/js/mocks'),
  '@model': resolve(__dirname, './src/js/model'),
  '@view': resolve(__dirname, './src/js/view'),
  '@presenter': resolve(__dirname, './src/js/presenter')
}

export default {
  root: resolve(__dirname, './src'),
  publicDir: resolve(__dirname, './public'),
  build: {
    outDir: resolve(__dirname, './cinemaddict'),
    modulePreload: false,
    rollupOptions: {
      output: {
        assetFileNames: checkFileNames
      }
    },
  },
  server: {
    hmr: true,
    open: true
  },
  resolve: {
    alias: aliasesListNew
  },
  plugins: [
    ViteImageOptimizer({
      jpg: {
        quality: 75
      },
      jpeg: {
        quality: 75
      },
      png: {
        quality: 75
      },
      webp: {
        quality: 75,
        lossles: false
      },
      avif: {
        quality: 75,
        lossles: false
      },
    })
  ]
}
