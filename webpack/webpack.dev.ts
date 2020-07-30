/**
 * @author WMXPY
 * @namespace Webpack
 * @description Development
 */

import { SudooWebpackReact } from "@sudoo/webpack-react";
import { getBuildPath, getSourcePath, joinStylePath, joinTypeScriptPath } from "./path";

const PORT_NUMBER: number = 8082;

export default SudooWebpackReact.create({

    applicationPath: getSourcePath(),
    applicationEntryFile: 'index.tsx',

    buildPath: getBuildPath(),
    commonSassPath: joinStylePath('common'),

    tsconfigPath: joinTypeScriptPath('tsconfig.dev.json'),
}, {

    defines: {

        'process.env.RELEASE_VERSION': JSON.stringify(process.env.RELEASE_VERSION || 'LOCAL'),
        'process.env.PORTAL_PATH': JSON.stringify(process.env.PORTAL_PATH),
        'process.env.TEST_SERVER_PATH': JSON.stringify(process.env.TEST_SERVER_PATH),
    },
    title: 'Brontosaurus RED',
    mobile: false,
    insertion: '<!-- Insertion Point -->',
}).development(PORT_NUMBER);
