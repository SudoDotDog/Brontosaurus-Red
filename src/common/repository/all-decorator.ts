/**
 * @author WMXPY
 * @namespace Common_Repository
 * @description All Decorators
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type AllDecoratorsResponse = {

    name: string;
    description?: string;
};

export const fetchAllDecorators = async (): Promise<AllDecoratorsResponse[]> => {

    const response: {
        decorators: AllDecoratorsResponse[];
    } = await Fetch
        .get
        .withJson(joinRoute('/decorator/all'))
        .bearer(Brontosaurus.hard().raw)
        .fetchJson();

    return response.decorators;
};
