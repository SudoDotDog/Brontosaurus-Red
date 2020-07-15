/**
 * @author WMXPY
 * @namespace Preference_Repository
 * @description Global
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const globalPreferenceRepository = async (
    globalAvatar?: string,
    globalFavicon?: string,
    globalHelpLink?: string,
    globalPrivacyPolicy?: string,
    indexPage?: string,
    entryPage?: string,
): Promise<number> => {

    const response: {
        changed: number;
    } = await Fetch
        .post
        .withJson(joinRoute('/preference/global'))
        .bearer(Brontosaurus.hard().raw)
        .addIfExist('globalAvatar', globalAvatar)
        .addIfExist('globalFavicon', globalFavicon)
        .addIfExist('globalHelpLink', globalHelpLink)
        .addIfExist('globalPrivacyPolicy', globalPrivacyPolicy)
        .addIfExist('indexPage', indexPage)
        .addIfExist('entryPage', entryPage)
        .fetchJson();

    return response.changed;
};
