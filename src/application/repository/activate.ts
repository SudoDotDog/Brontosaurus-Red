/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Application Activate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const activateApplicationRepository = async (
    application: string,
): Promise<string> => {

    const response: {
        activated: string;
    } = await Fetch
        .post
        .json(joinRoute('/application/activate'))
        .bearer(Brontosaurus.hard().raw)
        .add('application', application)
        .fetch();

    return response.activated;
};
