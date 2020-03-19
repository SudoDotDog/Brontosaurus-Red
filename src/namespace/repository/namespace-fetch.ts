/**
 * @author WMXPY
 * @namespace Namespace_Repository
 * @description Namespace Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type NamespaceResponse = {

    readonly name: string;
    readonly namespace: string;
    readonly domain: string;
};

export type FetchNamespaceResponse = {

    readonly namespaces: NamespaceResponse[];
    readonly pages: number;
};

export const fetchNamespace = async (keyword: string, page: number): Promise<FetchNamespaceResponse> => {

    const response: FetchNamespaceResponse = await Fetch
        .post
        .json(joinRoute('/namespace/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword)
        .fetch();

    return response;
};
