const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        main: path.join(__dirname, 'src', 'js', 'main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'static', 'js'),
        filename: '[name].js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src', 'js'),
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                ],
                options: {
                    cacheDirectory: 'babel_cache',
                }
            },
        ],
    },
    resolve: {
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
};
