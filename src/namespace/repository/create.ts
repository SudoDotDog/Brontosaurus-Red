/**
 * @author WMXPY
 * @namespace Namespace_Repository
 * @description Namespace Create
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch, IFetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const createNamespace = async (name: string, namespace: string): Promise<string> => {

    const fetch: IFetch = Fetch
        .post
        .json(joinRoute('/namespace/create'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .add('namespace', namespace);

    const response: {
        namespace: string;
    } = await fetch.fetch();

    return response.namespace;
};
