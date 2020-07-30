/**
 * @author WMXPY
 * @namespace Webpack
 * @description Production
 */

import { SudooWebpackReact } from "@sudoo/webpack-react";
import { getBuildPath, getSourcePath, joinStylePath, joinTypeScriptPath } from "./path";

export default SudooWebpackReact.create({

    applicationPath: getSourcePath(),
    applicationEntryFile: 'index.tsx',

    buildPath: getBuildPath(),
    commonSassPath: joinStylePath('common'),

    tsconfigPath: joinTypeScriptPath('tsconfig.build.json'),
}, {

    defines: {

        'process.env.RELEASE_VERSION': JSON.stringify(process.env.RELEASE_VERSION || 'LOCAL'),
    },
    title: 'Brontosaurus RED',
    silent: true,
    mobile: false,
    insertion: '<!-- Insertion Point -->',
    favicon: '/favicon.png',
}).production();
