/**
 * @author WMXPY
 * @namespace Namespace_Repository
 * @description Namespace Deactivate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const deactivateNamespaceRepository = async (
    namespace: string,
): Promise<string> => {

    const response: {
        deactivated: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/namespace/deactivate'))
        .bearer(Brontosaurus.hard().raw)
        .add('namespace', namespace)
        .fetchJson();

    return response.deactivated;
};
