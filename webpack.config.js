require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: process.env.MODE,
    entry: './app/js/app.js',
    output: {
        path: path.resolve(__dirname, 'assets/js'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    "file-loader?name=[path]../../[name].html",
                    "extract-loader",
                    "html-loader",
                    "pug-html-loader"
                ]
            },
            { test: /\.jpg$/, use: [ "file-loader" ] },
            { test: /\.png$/, use: [ "url-loader?mimetype=image/png" ] }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: {
                STRIPE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
            }
        })
    ]
};