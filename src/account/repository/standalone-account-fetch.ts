/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Standalone Account Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type StandaloneAccountResponse = {
    readonly username: string;
    readonly namespace: string;
    readonly email?: string;
    readonly phone?: string;
    readonly twoFA: boolean;
    readonly groups: number;
};

export type FetchStandaloneAccountResponse = {
    pages: number;
    accounts: StandaloneAccountResponse[];
};

export const fetchStandaloneAccount = async (keyword: string, page: number): Promise<FetchStandaloneAccountResponse> => {

    const response: {
        accounts: StandaloneAccountResponse[];
        pages: number;
    } = await Fetch
        .post
        .json(joinRoute('/account/standalone'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword)
        .fetch();

    return response;
};
