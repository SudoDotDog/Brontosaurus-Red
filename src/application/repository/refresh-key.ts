/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Refresh Key
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const refreshKeyRepository = async (key: string): Promise<string> => {

    const response: {
        application: string;
    } = await Fetch
        .post
        .json(joinRoute('/application/refresh-key'))
        .bearer(Brontosaurus.hard().raw)
        .add('key', key)
        .fetch();

    return response.application;
};
