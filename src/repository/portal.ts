/**
 * @author WMXPY
 * @namespace Util
 * @description Portal
 */

export const getPortalPath = (): string => {

    if (process && process.env && process.env.PORTAL_PATH) {
        return process.env.PORTAL_PATH as string;
    }
    if (window && (window as any).env && (window as any).env.PORTAL_PATH) {
        return (window as any).env.PORTAL_PATH as string;
    }
    return '';
};
