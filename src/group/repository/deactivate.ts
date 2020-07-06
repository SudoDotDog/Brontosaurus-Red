/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Group Deactivate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const deactivateGroupRepository = async (
    group: string,
): Promise<string> => {

    const response: {
        deactivated: string;
    } = await Fetch
        .post
        .json(joinRoute('/group/deactivate'))
        .bearer(Brontosaurus.hard().raw)
        .add('group', group)
        .fetch();

    return response.deactivated;
};
