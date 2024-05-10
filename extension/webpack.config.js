const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: {
    background: './background.ts', // distributes background.js
    content: './content_scripts/content.ts', // distributes content.js
    inject: './content_scripts/inject.ts', // distributes inject.js
    devtools: './devtools/devtools.ts', // distributes devtools.js
    panel: './src/index.tsx', // distributes panel.js
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(tsx?|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    // distributes panel.html
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'panel.html',
      chunks: ['panel'],
      excludeChunks: ['devtools'],
    }),
    // distributes devtools.html
    new HtmlWebpackPlugin({
      template: './devtools/devtools.html',
      filename: 'devtools.html',
      chunks: ['devtools'],
    }),
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: '.' }, // distributes manifest.json
        { from: 'images', to: 'images' }, // distributes images/
      ],
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    // alias: {
    //   '@mui/styled-engine': '@mui/styled-engine-sc',
    // },
  },

  // source map support for debugging (uncomment when needed)
  devtool: 'cheap-module-source-map',
};
