// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module.rule('ts').uses.delete('thread-loader');
  },
  configureWebpack: {
    output: {
      libraryExport: 'default',
      libraryTarget: 'umd', // Ensure UMD build
      filename: '[name].js', // Dynamically generate filenames
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
    },
  },
};
