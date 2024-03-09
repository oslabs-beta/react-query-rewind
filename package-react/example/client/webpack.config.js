const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    entry: './src/index.tsx',
    mode: 'development',
    target: 'web',

    output: {
      path: path.resolve(__dirname, 'dist/client'),
      filename: 'client_bundle.js',
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],

    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        '@tanstack/react-query': path.resolve(
          './node_modules/@tanstack/react-query'
        ),
        // 'react-query': path.resolve('./node_modules/@tanstack/react-query'),
        // 'query-core': path.resolve('./node_modules/@tanstack/query-core')
      },
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },

    devServer: {
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:3000',
      },
      static: {
        directory: path.join(__dirname, 'dist/client'),
      },
      hot: true,
    },
  },
];
