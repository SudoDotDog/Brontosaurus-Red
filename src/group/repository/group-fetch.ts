/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Group Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type GroupResponse = {
    name: string;
};

export const fetchGroup = async (keyword: string = ''): Promise<GroupResponse[]> => {

    const response: {
        groups: GroupResponse[];
    } = await Fetch
        .post
        .json(joinRoute('/group/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', 0)
        .add('keyword', keyword)
        .fetch();

    return response.groups;
};
