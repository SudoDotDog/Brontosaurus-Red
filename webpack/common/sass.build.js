/**
 * @author WMXPY
 * @namespace Webpack
 * @description Sass Loader Production
 */

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const COMMON_SASS_DIR = path.resolve(__dirname, '..', '..', 'style', 'common');

module.exports = [{
        test: /\.sass$/,
        exclude: COMMON_SASS_DIR,
        use: [{
                loader: MiniCssExtractPlugin.loader,
            },
            {
                loader: 'typings-for-css-modules-loader',
                options: {
                    modules: true,
                    namedExport: true,
                    camelCase: true,
                    minimize: true,
                    sass: true,
                    localIdentName: "[name]_[local]__[hash:base64:5]"
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    outputStyle: 'expanded',
                },
            },
        ],
    },
    {
        test: /\.sass$/,
        include: COMMON_SASS_DIR,
        use: [{
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
            },
            {
                loader: 'sass-loader',
                options: {
                    outputStyle: 'expanded',
                },
            },
        ],
    },
];