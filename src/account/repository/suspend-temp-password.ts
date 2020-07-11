/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Suspend Application Password
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SuspendTemporaryPasswordResponse = {

    readonly username: string;
};

export const suspendTemporaryPasswordRepository = async (username: string, namespace: string, passwordId: string): Promise<SuspendTemporaryPasswordResponse> => {

    const response: SuspendTemporaryPasswordResponse = await Fetch
        .post
        .withJson(joinRoute('/account/suspend-temporary-password'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .add('passwordId', passwordId)
        .fetchJson();

    return response;
};
