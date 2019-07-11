/**
 * @author WMXPY
 * @namespace Account_Repository
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
    decorators: number;
    tags: number;
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
