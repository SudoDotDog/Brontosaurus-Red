/**
 * @author WMXPY
 * @namespace Tag_Repository
 * @description Tag Activate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const activateTagRepository = async (
    tag: string,
): Promise<string> => {

    const response: {
        activated: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/tag/activate'))
        .bearer(Brontosaurus.hard().raw)
        .add('tag', tag)
        .fetchJson();

    return response.activated;
};
