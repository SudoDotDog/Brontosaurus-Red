/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Account Limbo
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type LimboAccountResponse = {

    readonly limbo: boolean;
    readonly tempPassword: string;
};

export const limboAccount = async (username: string, namespace: string): Promise<LimboAccountResponse> => {

    const response: LimboAccountResponse = await Fetch
        .post
        .withJson(joinRoute('/account/limbo'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .fetchJson();

    return response;
};
