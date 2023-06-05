const { resolve } = require('path');

module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'extends': [
    'airbnb',
    'eslint:recommended',
  ],
  'settings': {
    'react': {
      'version': '0'
    },
    'import/resolver': {
      'alias': {
        'map': [
          ['@', resolve(__dirname, './src')],
          ['@api', resolve(__dirname, './src/js/api/')],
          ['@utils', resolve(__dirname, './src/js/utils')],
          ['@mocks', resolve(__dirname, './src/js/mocks')],
          ['@model', resolve(__dirname, './src/js/model')],
          ['@view', resolve(__dirname, './src/js/view')],
          ['@presenter', resolve(__dirname, './src/js/presenter')],
        ],
      }
    }
  }
}
