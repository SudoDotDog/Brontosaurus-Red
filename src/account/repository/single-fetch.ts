/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Single Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SingleFetchResponse = {

    readonly active: boolean;
    readonly username: string;
    readonly displayName?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly organization?: {
        readonly name: string;
        readonly active: boolean;
        readonly owner: string;
    };
    readonly twoFA: boolean;
    readonly beacons: Record<string, any>;
    readonly infos: Record<string, any>;
    readonly decorators: string[];
    readonly tags: string[];
    readonly groups: string[];
};

export const singleFetchRepository = async (username: string): Promise<SingleFetchResponse> => {

    const response: {
        account: SingleFetchResponse;
    } = await Fetch
        .post
        .json(joinRoute('/account/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .fetch();

    return response.account;
};
