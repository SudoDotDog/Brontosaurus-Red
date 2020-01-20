/**
 * @author WMXPY
 * @namespace Tag_Repository
 * @description Tag Create
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch, IFetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const createTagRepository = async (name: string, description?: string): Promise<string> => {

    const fetch: IFetch = Fetch
        .post
        .json(joinRoute('/tag/create'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name);

    if (description) {
        fetch.add('description', description);
    }

    const response: {
        tag: string;
    } = await fetch.fetch();

    return response.tag;
};
