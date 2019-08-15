/**
 * @author WMXPY
 * @namespace Tag_Repository
 * @description Update
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type UpdateTagRequest = {

    readonly name: string;
    readonly description?: string;
    readonly addableGroups: string[];
    readonly removableGroups: string[];
};

export const updateTagRepository = async (request: UpdateTagRequest): Promise<string> => {

    const response: {
        readonly Tag: string;
    } = await Fetch
        .post
        .json(joinRoute('/tag/update'))
        .bearer(Brontosaurus.hard().raw)
        .migrate(request)
        .fetch();

    return response.Tag;
};