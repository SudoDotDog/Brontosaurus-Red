/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Set Owner Repository
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SetOwnerResponse = {

    readonly account: string;
    readonly organization: string;
};

export const setOwnerRepository = async (username: string, organization: string): Promise<SetOwnerResponse> => {

    const response: SetOwnerResponse = await Fetch
        .post
        .json(joinRoute('/organization/set-owner'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('organization', organization)
        .fetch();

    return response;
};
