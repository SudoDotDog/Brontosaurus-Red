/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Group Create
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { IFetch } from "@sudoo/fetch/dist/declare";
import { joinRoute } from "../../repository/route";

export const createGroup = async (name: string, description?: string): Promise<string> => {

    const fetch: IFetch = Fetch
        .post
        .json(joinRoute('/group/create'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name);

    if (description) {
        fetch.add('description', description);
    }

    const response: {
        group: string;
    } = await fetch.fetch();

    return response.group;
};
