/**
 * @author WMXPY
 * @namespace Preference_Repository
 * @description Global Background Image
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const globalBackgroundImagesPreferenceRepository = async (
    globalBackgroundImages?: string[],
): Promise<number> => {

    const response: {
        changed: number;
    } = await Fetch
        .post
        .withJson(joinRoute('/preference/global-background-images'))
        .bearer(Brontosaurus.hard().raw)
        .addIfExist('globalBackgroundImages', globalBackgroundImages)
        .fetchJson();

    return response.changed;
};
