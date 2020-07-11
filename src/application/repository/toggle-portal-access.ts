/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Toggle Portal Access
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const togglePortalAccessRepository = async (key: string): Promise<string> => {

    const response: {
        application: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/application/toggle-portal-access'))
        .bearer(Brontosaurus.hard().raw)
        .add('key', key)
        .fetchJson();

    return response.application;
};
