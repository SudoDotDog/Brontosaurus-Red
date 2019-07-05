/**
 * @author WMXPY
 * @namespace Decorator_Repository
 * @description Single
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SingleDecoratorResponse = {

    readonly name: string;
    readonly description?: string;
    readonly addableGroups: string[];
    readonly removableGroups: string[];
};

export const singleDecorator = async (name: string): Promise<SingleDecoratorResponse> => {

    const response: SingleDecoratorResponse = await Fetch
        .post
        .json(joinRoute('/decorator/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .fetch();

    return response;
};
