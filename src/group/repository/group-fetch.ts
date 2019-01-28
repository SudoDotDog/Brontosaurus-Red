/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Group Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";

export type GroupResponse = {
    name: string;
};

export const fetchGroup = async (keyword: string): Promise<GroupResponse[]> => {

    const response: {
        groups: GroupResponse[];
    } = await Fetch
        .post
        .json('http://localhost:8080/group/fetch')
        .bearer(Brontosaurus.raw)
        .add('page', 0)
        .add('keyword', keyword)
        .fetch();

    console.log(response);
    return response.groups;
};
