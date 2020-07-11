/**
 * @author WMXPY
 * @namespace Namespace_Repository
 * @description Namespace Activate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const activateNamespaceRepository = async (
    namespace: string,
): Promise<string> => {

    const response: {
        activated: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/namespace/activate'))
        .bearer(Brontosaurus.hard().raw)
        .add('namespace', namespace)
        .fetchJson();

    return response.activated;
};
