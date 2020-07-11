/**
 * @author WMXPY
 * @namespace Tag_Repository
 * @description Single
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SingleTagResponse = {

    readonly active: boolean;
    readonly name: string;
    readonly description?: string;
};

export const singleTagRepository = async (name: string): Promise<SingleTagResponse> => {

    const response: SingleTagResponse = await Fetch
        .post
        .withJson(joinRoute('/tag/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .fetchJson();

    return response;
};
