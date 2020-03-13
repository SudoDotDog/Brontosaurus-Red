/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Suspend Application Password
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SuspendApplicationPasswordResponse = {

    readonly username: string;
};

export const suspendApplicationPasswordRepository = async (username: string, namespace: string, passwordId: string): Promise<SuspendApplicationPasswordResponse> => {

    const response: SuspendApplicationPasswordResponse = await Fetch
        .post
        .json(joinRoute('/account/suspend-application-password'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .add('passwordId', passwordId)
        .fetch();

    return response;
};
