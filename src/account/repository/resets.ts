/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Fetch Resets
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type AccountResetElement = {

    readonly account: string;
    readonly succeed: boolean;
    readonly emailUsed: string;
    readonly emailExpected: string;
    readonly platform: string;
    readonly userAgent: string;
    readonly target: string;
    readonly source: string;
    readonly proxySources: string[];
    readonly application: string;
    readonly identifier: string;
    readonly at: Date;
};

export type AccountResetResponse = {

    readonly pages: number;
    readonly resets: AccountResetElement[];
};

export const fetchAccountResets = async (username: string, namespace: string, page: number): Promise<AccountResetResponse> => {

    const response: AccountResetResponse = await Fetch
        .post
        .json(joinRoute('/account/resets'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .add('page', page)
        .addProducePostProcessFunction((draft: AccountResetResponse) => {
            for (const each of draft.resets) {
                (each as any).at = new Date(each.at);
            }
        })
        .fetch();

    return response;
};
