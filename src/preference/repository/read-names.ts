/**
 * @author WMXPY
 * @namespace Preference_Repository
 * @description Read Names
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type ReadNamesRepositoryResponse = {

    readonly systemName?: string;
    readonly accountName?: string;
};

export const readNamePreferenceRepository = async (): Promise<ReadNamesRepositoryResponse> => {

    const response: ReadNamesRepositoryResponse = await Fetch
        .get
        .withJson(joinRoute('/preference/read/names'))
        .bearer(Brontosaurus.hard().raw)
        .fetchJson();

    return response;
};
