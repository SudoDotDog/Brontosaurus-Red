/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Account Reset Attempt
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type ResetAttemptResponse = {

    readonly attempt: number;
};

export const resetAttemptAccount = async (username: string, namespace: string): Promise<number> => {

    const response: ResetAttemptResponse = await Fetch
        .post
        .json(joinRoute('/account/reset-attempt'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .fetch();

    return response.attempt;
};
