const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', // Use 'production' for production builds

  entry: {
    background: './background.ts', // Your background script
    content: './content_scripts/content.ts', // Your content script
    inject: './content_scripts/inject.ts',
    devtools: './devtools/devtools.ts', // Your devtools script
    panel: './src/index.tsx', // Entry point for the DevTools panel React app
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html', // Assuming this is your React app's HTML
      filename: 'panel.html', // This will be the file loaded in the DevTools panel
      chunks: ['panel'], // Include only the panel bundle
      excludeChunks: ['devtools'], // Exclude the devtools script from this HTML
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '.' }, // Adjust if you have a different structure
        { from: 'manifest.json', to: '.' },
        // Copy other assets like icons if needed
      ],
    }),
    // Add other plugins as needed.
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },

  // Add source map support for debugging (optional)
  devtool: 'cheap-module-source-map',
};
