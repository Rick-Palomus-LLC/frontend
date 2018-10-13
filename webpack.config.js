require('dotenv').config();
const path = require('path');

module.exports = {
    mode: process.env.MODE,
    entry: './app/js/app.js',
    output: {
        path: path.resolve(__dirname, 'assets/js'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.sass$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: {
                STRIPE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
            }
        })
    ]
};