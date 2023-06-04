import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const checkFileNames = ({ name }) => {

  if (/^emoji/.test(name ?? '')) return 'assets/images/emoji/[name][extname]';

  if (/\.(jpe?g|png|webp)/.test(name ?? '')) return 'assets/images/[name][extname]';

  if (/\.(woff|woff2)/.test(name ?? '')) return 'assets/fonts/[name][extname]';

  if (/\.(svg)/.test(name ?? '')) return 'assets/images/svg/[name][extname]';

  return 'assets/[name]-[hash][extname]';
}

const aliasList = {
  '@': resolve(__dirname, './src'),
  '@api': resolve(__dirname, './src/js/api'),
  '@utils': resolve(__dirname, './src/js/utils'),
  '@mocks': resolve(__dirname, './src/js/mocks'),
  '@model': resolve(__dirname, './src/js/model'),
  '@view': resolve(__dirname, './src/js/view'),
  '@presenter': resolve(__dirname, './src/js/presenter')
}

const imageOptimizer = {
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
}

export default {
  base: '/cinemaddict/',
  root: resolve(__dirname, './src/'),
  publicDir: resolve(__dirname, './public/'),
  build: {
    outDir: resolve(__dirname, './cinemaddict/'),
    modulePreload: false,
    rollupOptions: {
      output: {
        filename: "[name].[contenthash].js",
        assetFileNames: checkFileNames
      }
    },
  },
  server: {
    hmr: true,
    open: true
  },
  resolve: {
    alias: aliasList
  },
  plugins: [
    ViteImageOptimizer(imageOptimizer),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      workbox: {
        swDest: 'cinemaddict/sw.js',
        globDirectory: 'cinemaddict/',
        globPatterns: [
          '**\/*.{js,css,html}',
          '**\/fonts/**/*.woff2',
          '**\/icons/**/*.svg',
          '**\/emoji/**/*.png',
          '**\/images/*.png',
          '**\/images/*.png',
        ],
        runtimeCaching: [{
          urlPattern: new RegExp(/\/posters\//),
          handler: 'CacheFirst',
          options: {
            cacheName: 'cinemaddict-posters',
            cacheableResponse: {
              statuses: [200, 299],
            },
          },
        }],
      },
    })
  ]
}
