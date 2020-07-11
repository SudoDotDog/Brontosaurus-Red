/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Account Limbo
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type LimboAccountResponse = {

    readonly removed: string;
};

export const removeTwoFAAccount = async (username: string, namespace: string): Promise<string> => {

    const response: LimboAccountResponse = await Fetch
        .post
        .withJson(joinRoute('/account/remove-2fa'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .fetchJson();

    return response.removed;
};
