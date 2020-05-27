/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Account Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type UserResponse = {

    readonly active: boolean;
    readonly attempts: number;
    readonly username: string;
    readonly namespace: string;
    readonly displayName?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly twoFA: boolean;
    readonly groups: number;
    readonly decorators: number;
    readonly tags: number;
};

export type FetchAccountResponse = {
    pages: number;
    accounts: UserResponse[];
};

export const fetchAccount = async (keyword: string, page: number): Promise<FetchAccountResponse> => {

    const response: {
        accounts: UserResponse[];
        pages: number;
    } = await Fetch
        .post
        .json(joinRoute('/account/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword)
        .fetch();

    return response;
};
