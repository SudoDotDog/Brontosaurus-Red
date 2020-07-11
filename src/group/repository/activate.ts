/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Group Activate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const activateGroupRepository = async (
    group: string,
): Promise<string> => {

    const response: {
        activated: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/group/activate'))
        .bearer(Brontosaurus.hard().raw)
        .add('group', group)
        .fetchJson();

    return response.activated;
};
