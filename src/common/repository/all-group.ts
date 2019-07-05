/**
 * @author WMXPY
 * @namespace Common_Repository
 * @description All Groups
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type AllGroupsResponse = {

    name: string;
    description?: string;
};

export const fetchAllGroups = async (): Promise<AllGroupsResponse[]> => {

    const response: {
        groups: AllGroupsResponse[];
    } = await Fetch
        .get
        .json(joinRoute('/group/all'))
        .bearer(Brontosaurus.hard().raw)
        .fetch();

    return response.groups;
};
