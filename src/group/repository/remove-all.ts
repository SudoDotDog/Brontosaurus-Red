/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Remove All
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const removeAllGroupRepository = async (name: string): Promise<string> => {

    const response: {
        readonly group: string;
    } = await Fetch
        .post
        .json(joinRoute('/group/remove-all'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .fetch();

    return response.group;
};
