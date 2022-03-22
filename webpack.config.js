const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        })
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.ts$/, use: 'awesome-typescript-loader' },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { enforce: 'pre', test: /\.ts$/, loader: 'tslint-loader' }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    mode: 'development',
    devServer: {
        static: __dirname + '/dist',
        hot: true,
        host: "localhost",
        port: 5500
    },
};

module.exports = config;