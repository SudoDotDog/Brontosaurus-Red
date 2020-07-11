/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Refresh Green
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const refreshGreenRepository = async (key: string): Promise<string> => {

    const response: {
        application: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/application/refresh-green'))
        .bearer(Brontosaurus.hard().raw)
        .add('key', key)
        .fetchJson();

    return response.application;
};
