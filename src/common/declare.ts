/**
 * @author WMXPY
 * @namespace Common
 * @description Declare
 */

export type ApplicationRedirection = {

    name: string;
    regexp: string;
};

export declare type PreviousPasswordReason = 'change' | 'reset' | 'temp';

export declare type PreviousPassword = {
    readonly password: string;
    readonly reason: PreviousPasswordReason;
    readonly changedAt: Date;
};
