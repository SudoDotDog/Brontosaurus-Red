/**
 * @author WMXPY
 * @namespace Decorator_Repository
 * @description Decorator Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type DecoratorResponse = {
    name: string;
    description?: string;
};

export const fetchDecorator = async (keyword: string = ''): Promise<DecoratorResponse[]> => {

    const response: {
        decorators: DecoratorResponse[];
    } = await Fetch
        .post
        .json(joinRoute('/decorator/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', 0)
        .add('keyword', keyword)
        .fetch();

    return response.decorators;
};
