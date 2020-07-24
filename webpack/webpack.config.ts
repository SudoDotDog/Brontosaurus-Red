/**
 * @author WMXPY
 * @namespace Webpack
 * @description Production
 */

import { SudooWebpack } from "@sudoo/webpack-react";
import * as Path from "path";

const BUILD_DIR: string = Path.resolve(__dirname, '..', 'dist');
const APP_DIR: string = Path.resolve(__dirname, '..', 'src');
const TSCONFIG_PATH: string = Path.resolve(__dirname, '..', 'typescript', 'tsconfig.dev.json');
const COMMON_SASS_DIR: string = Path.resolve(__dirname, '..', 'style', 'common');

export default SudooWebpack.create(
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
        },
        title: 'Brontosaurus RED',
        silent: true,
        mobile: false,
        insertion: '<!-- Insertion Point -->',
        favicon: '/favicon.png',
    },
).production();
