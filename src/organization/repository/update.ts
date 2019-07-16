/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Update
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type UpdateOrganizationRequest = {

    readonly name: string;
    readonly limit: number;
    readonly decorators: string[];
    readonly tags: string[];
};

export const updateOrganizationRepository = async (request: UpdateOrganizationRequest): Promise<string> => {

    const response: {
        readonly organization: string;
    } = await Fetch
        .post
        .json(joinRoute('/organization/update'))
        .bearer(Brontosaurus.hard().raw)
        .migrate(request)
        .fetch();

    return response.organization;
};
