/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Single Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SpecialPasswordResponse = {

    readonly id: string;
    readonly by: string;
    readonly expireAt: Date,
    readonly suspendedAt?: Date;
    readonly suspendedBy?: string;
};

export type SingleFetchResponse = {

    readonly active: boolean;
    readonly username: string;
    readonly namespace: string;
    readonly avatar?: string;
    readonly displayName?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly organization?: {
        readonly name: string;
        readonly active: boolean;
        readonly owner: string;
    };
    readonly previousPasswordsCount: number;
    readonly twoFA: boolean;
    readonly beacons: Record<string, any>;
    readonly infos: Record<string, any>;
    readonly decorators: string[];
    readonly tags: string[];
    readonly groups: string[];
    readonly temporaryPasswords: SpecialPasswordResponse[];
    readonly applicationPasswords: SpecialPasswordResponse[];
};

export const singleFetchRepository = async (username: string, namespace: string): Promise<SingleFetchResponse> => {

    const response: {
        account: SingleFetchResponse;
    } = await Fetch
        .post
        .json(joinRoute('/account/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .fetch();

    return {
        ...response.account,
        temporaryPasswords: response.account.temporaryPasswords.map((each) => ({
            ...each,
            expireAt: new Date(each.expireAt),
            suspendedAt: each.suspendedAt ? new Date(each.suspendedAt) : undefined,
        })),
        applicationPasswords: response.account.applicationPasswords.map((each) => ({
            ...each,
            expireAt: new Date(each.expireAt),
            suspendedAt: each.suspendedAt ? new Date(each.suspendedAt) : undefined,
        })),
    };
};
