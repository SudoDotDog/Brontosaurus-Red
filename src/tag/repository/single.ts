/**
 * @author WMXPY
 * @namespace Tag_Repository
 * @description Single
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SingleTagResponse = {

    readonly name: string;
    readonly description?: string;
    readonly addableGroups: string[];
    readonly removableGroups: string[];
};

export const singleTagRepository = async (name: string): Promise<SingleTagResponse> => {

    const response: SingleTagResponse = await Fetch
        .post
        .json(joinRoute('/tag/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .fetch();

    return response;
};
