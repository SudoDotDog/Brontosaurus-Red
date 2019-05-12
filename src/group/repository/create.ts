/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Group Create
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const createGroup = async (name: string): Promise<string> => {

    const response: {
        groups: string;
    } = await Fetch
        .post
        .json(joinRoute('group/create'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .fetch();

    console.log(response);
    return response.groups;
};
