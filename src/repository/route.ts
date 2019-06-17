/**
 * @author WMXPY
 * @namespace Util
 * @description Route
 */

export const joinRoute = (route: string) => {

    if (process && process.env && process.env.TEST_SERVER_PATH) {
        const path: string = process.env.PORTAL_PATH as string;
        return path + route;
    }
    if (window && (window as any).env && (window as any).env.PORTAL_PATH) {
        const path: string = (window as any).env.PORTAL_PATH as string;
        return path + route;
    }
    return route;
};
