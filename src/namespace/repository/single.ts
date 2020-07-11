/**
 * @author WMXPY
 * @namespace Namespace_Repository
 * @description Single
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SingleNamespaceResponse = {

    readonly active: boolean;
    readonly name: string;
    readonly namespace: string;
    readonly domain: string;
};

export const singleNamespace = async (namespace: string): Promise<SingleNamespaceResponse> => {

    const response: SingleNamespaceResponse = await Fetch
        .post
        .withJson(joinRoute('/namespace/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('namespace', namespace)
        .fetchJson();

    return response;
};
