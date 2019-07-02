/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Refresh Green
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const updateApplicationRepository = async (key: string): Promise<string> => {

    const response: {
        application: string;
    } = await Fetch
        .post
        .json(joinRoute('/application/refresh-green'))
        .bearer(Brontosaurus.hard().raw)
        .add('key', key)
        .fetch();

    return response.application;
};
