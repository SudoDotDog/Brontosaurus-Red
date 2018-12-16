/**
 * @author WMXPY
 * @namespace Webpack
 * @description Sass Loader Development
 */

const path = require('path');

const COMMON_SASS_DIR = path.resolve(__dirname, '..', '..', 'style', 'common');

module.exports = [{
        test: /\.sass$/,
        exclude: COMMON_SASS_DIR,
        use: [{
                loader: 'style-loader',
            },
            {
                loader: 'typings-for-css-modules-loader',
                options: {
                    modules: true,
                    namedExport: true,
                    camelCase: true,
                    sass: true,
                    localIdentName: "[name]_[local]__[hash:base64:5]"
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    outputStyle: 'expanded',
                    sourceMap: true,
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
                    sourceMap: true,
                },
            },
        ],
    },
];