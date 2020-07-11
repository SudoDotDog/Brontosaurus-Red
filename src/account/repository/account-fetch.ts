/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Account Fetch
 */

import { Basics } from "@brontosaurus/definition";
import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type UserResponse = {

    readonly active: boolean;
    readonly attempts: number;
    readonly resets: number;
    readonly username: string;
    readonly namespaceActive: boolean;
    readonly namespace: string;
    readonly displayName?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly twoFA: boolean;
    readonly groups: number;
    readonly decorators: number;
    readonly tags: number;
    readonly infos: Record<string, Basics>;
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
        .withJson(joinRoute('/account/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword)
        .fetchJson();

    return response;
};
