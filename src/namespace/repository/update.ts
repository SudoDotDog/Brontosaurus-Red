/**
 * @author WMXPY
 * @namespace Namespace_Repository
 * @description Update
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type UpdateNamespaceRequest = {

    readonly name: string;
    readonly namespace: string;
};

export const updateNamespaceRepository = async (request: UpdateNamespaceRequest): Promise<string> => {

    const response: {
        readonly namespace: string;
    } = await Fetch
        .post
        .json(joinRoute('/namespace/update'))
        .bearer(Brontosaurus.hard().raw)
        .migrate(request)
        .fetch();

    return response.namespace;
};
