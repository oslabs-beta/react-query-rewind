const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: {
        index: "./src/Index.tsx"
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                   presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                 },
              },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false },
                        }
                    }],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        alias: {
            '@mui/styled-engine': '@mui/styled-engine-sc'
        },
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html",
        }),
      ],
};

// Production config
if (process.env.NODE_ENV !== 'development') {
    config.mode = "production"
}

// Development config
if (process.env.NODE_ENV === 'development') {
    config.mode = "development"
    config.devServer = {
        static: path.join(__dirname, 'dev'), // The root directory for the dev server to serve files from
        port: 3000, // Specify the port. Default is 8080 if not specified
        hot: true, // Enable webpack's Hot Module Replacement feature
    }
}

module.exports = config;