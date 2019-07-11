/**
 * @author WMXPY
 * @namespace Tag_Repository
 * @description Tag Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type TagResponse = {

    readonly name: string;
    readonly description?: string;
};

export type FetchTagResponse = {

    readonly tags: TagResponse[];
    readonly pages: number;
};

export const fetchTagRepository = async (keyword: string, page: number): Promise<FetchTagResponse> => {

    const response: FetchTagResponse = await Fetch
        .post
        .json(joinRoute('/tag/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword)
        .fetch();

    return response;
};
