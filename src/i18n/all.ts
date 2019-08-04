/**
 * @author WMXPY
 * @namespace I18N
 * @description All
 */

import { PROFILE } from "./profile";

export const ENGLISH_UNITED_STATES: Record<PROFILE, string> = {

    [PROFILE.ADMIN]: 'Admin',

    [PROFILE.ADMIN_PANEL]: 'Admin Panel',
    [PROFILE.ACCOUNT]: 'Account',
    [PROFILE.ORGANIZATION]: 'Organization',
    [PROFILE.GROUP]: 'Group',
    [PROFILE.DECORATOR]: 'Decorator',
    [PROFILE.TAG]: 'Tag',
    [PROFILE.APPLICATION]: 'Application',
    [PROFILE.PREFERENCE]: 'Preference',
};

export const CHINESE_SIMPLIFIED: Record<PROFILE, string> = {

    [PROFILE.ADMIN]: '管理',

    [PROFILE.ADMIN_PANEL]: '管理面板',
    [PROFILE.ACCOUNT]: '账户',
    [PROFILE.ORGANIZATION]: '组织',
    [PROFILE.GROUP]: '用户组',
    [PROFILE.DECORATOR]: '装饰器',
    [PROFILE.TAG]: '标记',
    [PROFILE.APPLICATION]: '应用',
    [PROFILE.PREFERENCE]: '偏好',
};
