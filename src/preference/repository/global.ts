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
    globalHelpLink?: string,
    globalPrivacyPolicy?: string,
): Promise<number> => {

    const response: {
        changed: number;
    } = await Fetch
        .post
        .json(joinRoute('/preference/global'))
        .bearer(Brontosaurus.hard().raw)
        .add('globalAvatar', globalAvatar)
        .add('globalBackgroundImages', globalBackgroundImages)
        .add('globalHelpLink', globalHelpLink)
        .add('globalPrivacyPolicy', globalPrivacyPolicy)
        .fetch();

    return response.changed;
};
