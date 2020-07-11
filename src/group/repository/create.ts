/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Group Create
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch, IFetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const createGroup = async (name: string, description?: string): Promise<string> => {

    const fetch: IFetch = Fetch
        .post
        .withJson(joinRoute('/group/create'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name);

    if (description) {
        fetch.add('description', description);
    }

    const response: {
        group: string;
    } = await fetch.fetchJson();

    return response.group;
};
