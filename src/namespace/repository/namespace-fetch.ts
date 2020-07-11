/**
 * @author WMXPY
 * @namespace Namespace_Repository
 * @description Namespace Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type NamespaceResponse = {

    readonly active: boolean;
    readonly namespace: string;
    readonly domain: string;
    readonly name?: string;
};

export type FetchNamespaceResponse = {

    readonly namespaces: NamespaceResponse[];
    readonly pages: number;
};

export const fetchNamespace = async (keyword: string, page: number): Promise<FetchNamespaceResponse> => {

    const response: FetchNamespaceResponse = await Fetch
        .post
        .withJson(joinRoute('/namespace/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword)
        .fetchJson();

    return response;
};
