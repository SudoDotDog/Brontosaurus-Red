/**
 * @author WMXPY
 * @namespace Decorator_Repository
 * @description Decorator Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type DecoratorResponse = {

    readonly name: string;
    readonly description?: string;
};

export type FetchDecoratorResponse = {

    readonly decorators: DecoratorResponse[];
    readonly pages: number;
};

export const fetchDecorator = async (keyword: string, page: number): Promise<FetchDecoratorResponse> => {

    const response: FetchDecoratorResponse = await Fetch
        .post
        .json(joinRoute('/decorator/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword)
        .fetch();

    return response;
};
