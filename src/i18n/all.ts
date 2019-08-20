/**
 * @author WMXPY
 * @namespace I18N
 * @description All
 */

import { PROFILE } from "./profile";

export const ENGLISH_UNITED_STATES: Record<PROFILE, string> = {

    [PROFILE.ACCOUNT]: 'Account',
    [PROFILE.ADMIN]: 'Admin',
    [PROFILE.ADMIN_PANEL]: 'Admin Panel',
    [PROFILE.APPLICATION]: 'Application',
    [PROFILE.CHANGE_PASSWORD]: 'Change Password',
    [PROFILE.DECORATOR]: 'Decorator',
    [PROFILE.GROUP]: 'Group',
    [PROFILE.PREFERENCE]: 'Preference',
    [PROFILE.MY_ACCOUNT]: 'My Account',
    [PROFILE.ORGANIZATION]: 'Organization',
    [PROFILE.TAG]: 'Tag',
    [PROFILE.TWO_FACTOR_AUTHORIZATION]: 'Two-Factor Authorization',
    [PROFILE.WELCOME]: 'Welcome!',
};

export const CHINESE_SIMPLIFIED: Record<PROFILE, string> = {

    [PROFILE.ACCOUNT]: '账户',
    [PROFILE.ADMIN]: '管理',
    [PROFILE.ADMIN_PANEL]: '管理面板',
    [PROFILE.APPLICATION]: '应用',
    [PROFILE.CHANGE_PASSWORD]: '修改密码',
    [PROFILE.DECORATOR]: '装饰器',
    [PROFILE.GROUP]: '用户组',
    [PROFILE.ORGANIZATION]: '组织',
    [PROFILE.PREFERENCE]: '偏好',
    [PROFILE.MY_ACCOUNT]: '我的账户',
    [PROFILE.TAG]: '标记',
    [PROFILE.TWO_FACTOR_AUTHORIZATION]: '两步验证',
    [PROFILE.WELCOME]: '欢迎！',
};
