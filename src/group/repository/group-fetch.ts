/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Group Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type GroupResponse = {

    readonly name: string;
    readonly decorators: number;
    readonly description?: string;
};

export type FetchGroupResponse = {

    readonly groups: GroupResponse[];
    readonly pages: number;
};

export const fetchGroup = async (keyword: string, page: number): Promise<FetchGroupResponse> => {

    const response: FetchGroupResponse = await Fetch
        .post
        .json(joinRoute('/group/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword)
        .fetch();

    return response;
};
