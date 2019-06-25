/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Organization Deactivate
 */

import { Basics } from "@brontosaurus/definition";
import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const deactivateOrganization = async (
    organization: string,
): Promise<string> => {

    const response: {
        deactivated: string;
    } = await Fetch
        .post
        .json(joinRoute('/organization/deactivate'))
        .bearer(Brontosaurus.hard().raw)
        .add('organization', organization)
        .fetch();

    return response.deactivated;
};
