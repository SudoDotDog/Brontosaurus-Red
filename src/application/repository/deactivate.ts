/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Application Deactivate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const deactivateApplicationRepository = async (
    application: string,
): Promise<string> => {

    const response: {
        deactivated: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/application/deactivate'))
        .bearer(Brontosaurus.hard().raw)
        .add('application', application)
        .fetchJson();

    return response.deactivated;
};
