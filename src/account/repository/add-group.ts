/**
 * @author WMXPY
 * @namespace User_Repository
 * @description Add Group
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const addGroup = async (username: string, group: string): Promise<string> => {

    const response: {
        account: string;
    } = await Fetch
        .post
        .json(joinRoute('/account/add-group/'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('group', group)
        .fetch();

    console.log(response);
    return response.account;
};
