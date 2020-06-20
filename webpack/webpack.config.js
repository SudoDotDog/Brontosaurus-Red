/**
 * @author WMXPY
 * @namespace Webpack
 * @description Production
 */

const SudooWebpack = require("@sudoo/webpack-react").SudooWebpack;
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '..', 'dist');
const APP_DIR = path.resolve(__dirname, '..', 'src');
const TSCONFIG_PATH = path.resolve(__dirname, '..', 'typescript', 'tsconfig.dev.json');
const COMMON_SASS_DIR = path.resolve(__dirname, '..', 'style', 'common');

module.exports = SudooWebpack.create(
    {
        APP_DIR,
        BUILD_DIR,
        COMMON_SASS_DIR,

        TSCONFIG_PATH,

        APP_ENTRY_FILE_NAME: 'index.tsx',
    },
    {
        defines: {
            'process.env.RELEASE_VERSION': JSON.stringify(process.env.RELEASE_VERSION ?? 'LOCAL'),
        },
        title: 'Red - Brontosaurus',
        silent: true,
        mobile: false,
        insertion: '<!-- Insertion Point -->',
        favicon: '/favicon.png',
    },
).production();
