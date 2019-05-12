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
    groups: number;
    infos: Record<string, any>;
};

export const fetchAccount = async (keyword: string): Promise<UserResponse[]> => {

    const response: {
        accounts: UserResponse[];
    } = await Fetch
        .post
        .json(joinRoute('/account/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', 0)
        .add('keyword', keyword)
        .fetch();

    console.log(response);
    return response.accounts;
};
