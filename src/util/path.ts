/**
 * @author WMXPY
 * @namespace Util
 * @description Path
 */

export const buildAdminAccountEdit = (username: string, namespace: string): string => {

    const encodedUsername: string = encodeURIComponent(username);
    const encodedNamespace: string = encodeURIComponent(namespace);
    return `/admin/account/e/${encodedNamespace}/${encodedUsername}`;
};

export const buildAdminAccountMore = (username: string, namespace: string): string => {

    const encodedUsername: string = encodeURIComponent(username);
    const encodedNamespace: string = encodeURIComponent(namespace);
    return `/admin/account/more/${encodedNamespace}/${encodedUsername}`;
};

export const buildAdminAccountAssign = (username: string, namespace: string): string => {

    const encodedUsername: string = encodeURIComponent(username);
    const encodedNamespace: string = encodeURIComponent(namespace);
    return `/admin/account/o/${encodedNamespace}/${encodedUsername}`;
};

export const buildAdminAccountAttempts = (username: string, namespace: string): string => {

    const encodedUsername: string = encodeURIComponent(username);
    const encodedNamespace: string = encodeURIComponent(namespace);
    return `/admin/account/attempts/${encodedNamespace}/${encodedUsername}`;
};

export const buildAdminAccountResets = (username: string, namespace: string): string => {

    const encodedUsername: string = encodeURIComponent(username);
    const encodedNamespace: string = encodeURIComponent(namespace);
    return `/admin/account/resets/${encodedNamespace}/${encodedUsername}`;
};

export const buildAdminApplicationEdit = (application: string): string => {

    const encoded: string = encodeURIComponent(application);
    return `/admin/application/e/${encoded}`;
};

export const buildAdminApplicationMore = (application: string): string => {

    const encoded: string = encodeURIComponent(application);
    return `/admin/application/more/${encoded}`;
};

export const buildAdminGroupMembers = (group: string): string => {

    const encoded: string = encodeURIComponent(group);
    return `/admin/group/members/${encoded}`;
};

export const buildAdminGroupEdit = (group: string): string => {

    const encoded: string = encodeURIComponent(group);
    return `/admin/group/e/${encoded}`;
};

export const buildAdminTagEdit = (tag: string): string => {

    const encoded: string = encodeURIComponent(tag);
    return `/admin/tag/e/${encoded}`;
};

export const buildAdminTagMembers = (tag: string): string => {

    const encoded: string = encodeURIComponent(tag);
    return `/admin/tag/members/${encoded}`;
};

export const buildAdminNamespaceEdit = (namespace: string): string => {

    const encoded: string = encodeURIComponent(namespace);
    return `/admin/namespace/e/${encoded}`;
};

export const buildAdminNamespaceMore = (namespace: string): string => {

    const encoded: string = encodeURIComponent(namespace);
    return `/admin/namespace/more/${encoded}`;
};

export const buildAdminNamespaceMembers = (namespace: string): string => {

    const encoded: string = encodeURIComponent(namespace);
    return `/admin/namespace/members/${encoded}`;
};

export const buildAdminDecoratorEdit = (decorator: string): string => {

    const encoded: string = encodeURIComponent(decorator);
    return `/admin/decorator/e/${encoded}`;
};

export const buildAdminDecoratorMore = (decorator: string): string => {

    const encoded: string = encodeURIComponent(decorator);
    return `/admin/decorator/more/${encoded}`;
};

export const buildAdminDecoratorMembers = (decorator: string): string => {

    const encoded: string = encodeURIComponent(decorator);
    return `/admin/decorator/members/${encoded}`;
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
