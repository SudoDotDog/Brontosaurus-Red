/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Organization Activate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const activateOrganizationRepository = async (
    organization: string,
): Promise<string> => {

    const response: {
        activated: string;
    } = await Fetch
        .post
        .json(joinRoute('/organization/activate'))
        .bearer(Brontosaurus.hard().raw)
        .add('organization', organization)
        .fetch();

    return response.activated;
};
