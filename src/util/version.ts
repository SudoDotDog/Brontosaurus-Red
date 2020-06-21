/**
 * @author WMXPY
 * @namespace Util
 * @description Version
 */

export const getVersion = (): string => {

    if (process && process.env && process.env.RELEASE_VERSION) {
        const path: string = process.env.RELEASE_VERSION;
        return path;
    }

    return 'LOCAL';
};
