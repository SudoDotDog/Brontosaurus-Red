/**
 * @author WMXPY
 * @namespace Webpack
 * @description Path
 */

import * as Path from "path";

export const getBuildPath = (): string => {

    return Path.resolve(__dirname, '..', 'dist');
};

export const getSourcePath = (): string => {

    return Path.resolve(__dirname, '..', 'src');
};

export const joinStylePath = (...paths: string[]): string => {

    return Path.resolve(__dirname, '..', 'style', ...paths);
};

export const joinTypeScriptPath = (...paths: string[]): string => {

    return Path.resolve(__dirname, '..', 'typescript', ...paths);
};
