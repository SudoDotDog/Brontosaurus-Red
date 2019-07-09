/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Account Set Organization
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SetOrganizationResponse = {

    readonly account: string;
    readonly organization: string;
};

export const setOrganizationRepository = async (username: string, organization: string): Promise<SetOrganizationResponse> => {

    const response: SetOrganizationResponse = await Fetch
        .post
        .json(joinRoute('/account/set-organization'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('organization', organization)
        .fetch();

    return response;
};
