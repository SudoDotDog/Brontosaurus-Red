/**
 * @author WMXPY
 * @namespace Decorator_Repository
 * @description Decorator Activate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const activateDecoratorRepository = async (
    decorator: string,
): Promise<string> => {

    const response: {
        activated: string;
    } = await Fetch
        .post
        .json(joinRoute('/decorator/activate'))
        .bearer(Brontosaurus.hard().raw)
        .add('decorator', decorator)
        .fetch();

    return response.activated;
};
