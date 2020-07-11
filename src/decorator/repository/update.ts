/**
 * @author WMXPY
 * @namespace Decorator_Repository
 * @description Update
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type UpdateDecoratorRequest = {

    readonly name: string;
    readonly description?: string;
    readonly addableGroups: string[];
    readonly removableGroups: string[];
};

export const updateDecoratorRepository = async (request: UpdateDecoratorRequest): Promise<string> => {

    const response: {
        readonly decorator: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/decorator/update'))
        .bearer(Brontosaurus.hard().raw)
        .migrate(request)
        .fetchJson();

    return response.decorator;
};
