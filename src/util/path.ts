/**
* @author WMXPY
* @namespace Util
* @description Path
*/

export const buildAdminAccountEdit = (username: string, namespace: string) => {

    return `/admin/user/e/${namespace}/${username}`;
};

export const buildAdminAccountMore = (username: string, namespace: string) => {

    return `/admin/user/more/${namespace}/${username}`;
};

export const buildAdminAccountAssign = (username: string, namespace: string) => {

    return `/admin/user/o/${namespace}/${username}`;
};