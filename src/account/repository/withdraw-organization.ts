/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Account Withdraw Organization
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type WithdrawOrganizationAccountResponse = {

    readonly withdraw: string;
};

export const withdrawOrganizationAccountRepository = async (username: string, namespace: string): Promise<WithdrawOrganizationAccountResponse> => {

    const response: WithdrawOrganizationAccountResponse = await Fetch
        .post
        .withJson(joinRoute('/account/withdraw-organization'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .fetchJson();

    return response;
};
