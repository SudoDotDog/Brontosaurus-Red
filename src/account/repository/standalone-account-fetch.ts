/**
 * @author WMXPY
 * @namespace User_Repository
 * @description Account Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type UserResponse = {
    username: string;
    email?: string;
    phone?: string;
    twoFA: boolean;
    groups: number;
    infos: Record<string, any>;
};

export type FetchAccountResponse = {
    pages: number;
    accounts: UserResponse[];
};

export const fetchStandaloneAccount = async (keyword: string, page: number): Promise<FetchAccountResponse> => {

    const response: {
        accounts: UserResponse[];
        pages: number;
    } = await Fetch
        .post
        .json(joinRoute('/account/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword) // TODO
        .fetch();

    return response;
};
