/**
 * @author WMXPY
 * @namespace Preference_Repository
 * @description Read Global Background Image
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type ReadGlobalBackgroundImagesRepositoryResponse = {

    readonly globalBackgroundImages?: string[];
};

export const readGlobalBackgroundImagesPreferenceRepository = async (): Promise<ReadGlobalBackgroundImagesRepositoryResponse> => {

    const response: ReadGlobalBackgroundImagesRepositoryResponse = await Fetch
        .get
        .withJson(joinRoute('/preference/read/global-background-images'))
        .bearer(Brontosaurus.hard().raw)
        .fetchJson();

    return response;
};
