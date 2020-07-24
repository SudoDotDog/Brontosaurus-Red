/**
 * @author WMXPY
 * @namespace Webpack
 * @description Development
 */

import { SudooWebpack } from "@sudoo/webpack-react";
import * as Path from "path";

const BUILD_DIR = Path.resolve(__dirname, '..', 'dist');
const APP_DIR = Path.resolve(__dirname, '..', 'src');
const TSCONFIG_PATH = Path.resolve(__dirname, '..', 'typescript', 'tsconfig.dev.json');
const COMMON_SASS_DIR = Path.resolve(__dirname, '..', 'style', 'common');

const PORT_NUMBER: number = 8082;

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
            'process.env.RELEASE_VERSION': JSON.stringify(process.env.RELEASE_VERSION || 'LOCAL'),
            'process.env.PORTAL_PATH': JSON.stringify(process.env.PORTAL_PATH),
            'process.env.TEST_SERVER_PATH': JSON.stringify(process.env.TEST_SERVER_PATH),
        },
        title: 'Brontosaurus RED',
        mobile: false,
        insertion: '<!-- Insertion Point -->',
    },
).development(PORT_NUMBER);
