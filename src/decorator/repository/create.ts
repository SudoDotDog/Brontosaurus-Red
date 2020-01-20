/**
 * @author WMXPY
 * @namespace Decorator_Repository
 * @description Decorator Create
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch, IFetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const createDecorator = async (name: string, description?: string): Promise<string> => {

    const fetch: IFetch = Fetch
        .post
        .json(joinRoute('/decorator/create'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name);

    if (description) {
        fetch.add('description', description);
    }

    const response: {
        decorator: string;
    } = await fetch.fetch();

    return response.decorator;
};
