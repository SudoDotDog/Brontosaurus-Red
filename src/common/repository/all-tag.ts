/**
 * @author WMXPY
 * @namespace Common_Repository
 * @description All Tags
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type AllTagsResponse = {

    name: string;
    description?: string;
};

export const fetchAllTags = async (): Promise<AllTagsResponse[]> => {

    const response: {
        groups: AllTagsResponse[];
    } = await Fetch
        .get
        .json(joinRoute('/tag/all'))
        .bearer(Brontosaurus.hard().raw)
        .fetch();

    return response.groups;
};
