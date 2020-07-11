/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Verify Previous Password
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";
import { PreviousPassword } from "../../common/declare";

export type VerifyPreviousPasswordResponse = {

    readonly account: string;
    readonly previousPassword: PreviousPassword | null;
};

export const verifyPreviousPasswordRepository = async (
    username: string,
    namespace: string,
    password: string,
): Promise<PreviousPassword | null> => {

    const response: VerifyPreviousPasswordResponse = await Fetch
        .post
        .withJson(joinRoute('/account/verify-previous-password'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .add('password', password)
        .addProducePostProcessFunction((draft: VerifyPreviousPasswordResponse) => {

            if (draft.previousPassword) {
                (draft.previousPassword as any).changedAt = new Date(draft.previousPassword.changedAt);
            }
        })
        .fetchJson();

    return response.previousPassword;
};
