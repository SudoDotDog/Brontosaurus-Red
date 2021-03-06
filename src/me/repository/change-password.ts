/**
 * @author WMXPY
 * @namespace Me_Repository
 * @description Change Password
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const editPassword = async (password: string): Promise<string> => {

    const response: {
        account: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/flat/account/edit/password'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', Brontosaurus.hard().username)
        .add('password', password)
        .fetchJson();

    return response.account;
};
