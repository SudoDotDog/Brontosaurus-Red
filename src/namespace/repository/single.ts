/**
 * @author WMXPY
 * @namespace Namespace_Repository
 * @description Single
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SingleNamespaceResponse = {

    readonly name: string;
    readonly namespace: string;
    readonly domain: string;
};

export const singleNamespace = async (namespace: string): Promise<SingleNamespaceResponse> => {

    const response: SingleNamespaceResponse = await Fetch
        .post
        .json(joinRoute('/namespace/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('namespace', namespace)
        .fetch();

    return response;
};
