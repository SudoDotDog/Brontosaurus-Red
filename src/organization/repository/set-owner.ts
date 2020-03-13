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
};

export const setOwnerRepository = async (username: string, namespace: string, organization: string): Promise<SetOwnerResponse> => {

    const response: SetOwnerResponse = await Fetch
        .post
        .json(joinRoute('/organization/set-owner'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .add('organization', organization)
        .fetch();

    return response;
};
