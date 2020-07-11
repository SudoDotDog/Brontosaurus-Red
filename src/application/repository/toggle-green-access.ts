/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Toggle Green Access
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const toggleGreenAccessRepository = async (key: string): Promise<string> => {

    const response: {
        application: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/application/toggle-green-access'))
        .bearer(Brontosaurus.hard().raw)
        .add('key', key)
        .fetchJson();

    return response.application;
};
