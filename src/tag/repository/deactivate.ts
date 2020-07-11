/**
 * @author WMXPY
 * @namespace Tag_Repository
 * @description Tag Deactivate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const deactivateTagRepository = async (
    tag: string,
): Promise<string> => {

    const response: {
        deactivated: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/tag/deactivate'))
        .bearer(Brontosaurus.hard().raw)
        .add('tag', tag)
        .fetchJson();

    return response.deactivated;
};
