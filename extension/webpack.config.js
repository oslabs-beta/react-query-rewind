const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


const config = {
    entry: {
        index: "./src/index.tsx"
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
            {
                exclude: /node_modules/,
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]

            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./public", to: "./" }
            ],
        }),
        ...getHtmlPlugins(["index"]),
    ],
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
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
// Production config
if (process.env.NODE_ENV !== 'development') {
    config.mode = "production"
    config.output = {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
    }
    // config.plugins.push(new BomPlugin(true))
}

// Development config
if (process.env.NODE_ENV === 'development') {
    config.mode = "development"
    config.output = {
        path: path.join(__dirname, "dev"),
        filename: "[name].js",
    }
    config.devServer = {
        static: path.join(__dirname, 'dev'), // The root directory for the dev server to serve files from
        port: 3000, // Specify the port. Default is 8080 if not specified
        open: true, // Open the browser after server had been started
        hot: true, // Enable webpack's Hot Module Replacement feature
    }
}

module.exports = config;