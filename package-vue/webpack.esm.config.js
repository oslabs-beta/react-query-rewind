const { merge } = require('webpack-merge');
const baseConfig = require('./vue.config.js'); // Assuming the base config is in vue.config.js

module.exports = merge(baseConfig, {
  output: {
    filename: 'VueQueryRewind.esm.js',
    libraryTarget: 'module',
  },
  experiments: {
    outputModule: true,
  },
});
