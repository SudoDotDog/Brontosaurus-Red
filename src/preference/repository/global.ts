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
    globalBackgroundImages?: string[],
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
        .json(joinRoute('/preference/global'))
        .bearer(Brontosaurus.hard().raw)
        .addIfExist('globalAvatar', globalAvatar)
        .addIfExist('globalBackgroundImages', globalBackgroundImages)
        .addIfExist('globalFavicon', globalFavicon)
        .addIfExist('globalHelpLink', globalHelpLink)
        .addIfExist('globalPrivacyPolicy', globalPrivacyPolicy)
        .addIfExist('indexPage', indexPage)
        .addIfExist('entryPage', entryPage)
        .fetch();

    return response.changed;
};
