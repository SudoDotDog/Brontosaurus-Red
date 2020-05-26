/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Account Fetch Account
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type AccountAttemptElement = {

    readonly account: string,
    readonly succeed: boolean,
    readonly failedReason?: string,
    readonly platform: string,
    readonly userAgent: string,
    readonly target: string,
    readonly source: string,
    readonly proxySources: string[],
    readonly application: string,
    readonly identifier: string,
    readonly at: Date,
};

export type AccountAttemptResponse = {

    readonly pages: number;
    readonly attempts: AccountAttemptElement[];
};

export const fetchAccountAttempts = async (username: string, namespace: string, page: number): Promise<AccountAttemptResponse> => {

    const response: AccountAttemptResponse = await Fetch
        .post
        .json(joinRoute('/account/attempts'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .add('page', page)
        .addProducePostProcessFunction((draft: AccountAttemptResponse) => {
            for (const each of draft.attempts) {
                (each as any).at = new Date(each.at);
            }
        })
        .fetch();

    return response;
};
