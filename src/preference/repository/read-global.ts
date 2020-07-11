/**
 * @author WMXPY
 * @namespace Preference_Repository
 * @description Read Global
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type ReadGlobalRepositoryResponse = {

    readonly globalAvatar?: string;
    readonly globalBackgroundImages?: string[];
    readonly globalHelpLink?: string;
    readonly globalPrivacyPolicy?: string;

    readonly indexPage?: string;
    readonly entryPage?: string;
};

export const readGlobalPreferenceRepository = async (): Promise<ReadGlobalRepositoryResponse> => {

    const response: ReadGlobalRepositoryResponse = await Fetch
        .get
        .withJson(joinRoute('/preference/read/global'))
        .bearer(Brontosaurus.hard().raw)
        .fetchJson();

    return response;
};
