/**
 * @author WMXPY
 * @namespace Util
 * @description Path
 */

export const buildAdminAccountEdit = (username: string, namespace: string): string => {

    return `/admin/user/e/${namespace}/${username}`;
};

export const buildAdminAccountMore = (username: string, namespace: string): string => {

    return `/admin/user/more/${namespace}/${username}`;
};

export const buildAdminAccountAssign = (username: string, namespace: string): string => {

    return `/admin/user/o/${namespace}/${username}`;
};

export const buildAdminAccountAttempts = (username: string, namespace: string): string => {

    return `/admin/user/attempts/${namespace}/${username}`;
};

export const buildAdminAccountResets = (username: string, namespace: string): string => {

    return `/admin/user/resets/${namespace}/${username}`;
};

export const buildAdminApplicationEdit = (application: string): string => {

    return `/admin/application/e/${application}`;
};

export const buildAdminGroupMembers = (group: string): string => {

    return `/admin/group/members/${group}`;
};

export const buildAdminGroupEdit = (group: string): string => {

    return `/admin/group/e/${group}`;
};

export const buildAdminTagEdit = (tag: string): string => {

    return `/admin/tag/e/${tag}`;
};

export const buildAdminTagMembers = (tag: string): string => {

    return `/admin/tag/members/${tag}`;
};

export const buildAdminNamespaceEdit = (namespace: string): string => {

    return `/admin/namespace/e/${namespace}`;
};

export const buildAdminNamespaceMembers = (namespace: string): string => {

    return `/admin/namespace/members/${namespace}`;
};

export const buildAdminDecoratorEdit = (decorator: string): string => {

    return `/admin/decorator/e/${decorator}`;
};

export const buildAdminDecoratorMembers = (decorator: string): string => {

    return `/admin/decorator/members/${decorator}`;
};

export const buildAdminOrganizationEdit = (organization: string): string => {

    const encoded: string = encodeURIComponent(organization);
    return `/admin/organization/e/${encoded}`;
};

export const buildAdminOrganizationMore = (organization: string): string => {

    const encoded: string = encodeURIComponent(organization);
    return `/admin/organization/more/${encoded}`;
};

export const buildAdminOrganizationMembers = (organization: string): string => {

    const encoded: string = encodeURIComponent(organization);
    return `/admin/organization/members/${encoded}`;
};
