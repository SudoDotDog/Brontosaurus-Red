/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Update
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type UpdateGroupRequest = {

    readonly name: string;
    readonly description?: string;
    readonly decorators: string[];
};

export const updateGroupRepository = async (request: UpdateGroupRequest): Promise<string> => {

    const response: {
        readonly group: string;
    } = await Fetch
        .post
        .json(joinRoute('/group/update'))
        .bearer(Brontosaurus.hard().raw)
        .migrate(request)
        .fetch();

    return response.group;
};
