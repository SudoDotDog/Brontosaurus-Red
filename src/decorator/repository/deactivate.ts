/**
 * @author WMXPY
 * @namespace Decorator_Repository
 * @description Decorator Deactivate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const deactivateDecoratorRepository = async (
    decorator: string,
): Promise<string> => {

    const response: {
        deactivated: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/decorator/deactivate'))
        .bearer(Brontosaurus.hard().raw)
        .add('decorator', decorator)
        .fetchJson();

    return response.deactivated;
};
