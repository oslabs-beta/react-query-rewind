// vue.config.js
module.exports = {
  chainWebpack: config => {
    // Disable thread-loader for ts files
    config.module.rule('ts').uses.delete('thread-loader');
  },
  configureWebpack: {
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
