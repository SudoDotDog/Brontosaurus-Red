/**
 * @author WMXPY
 * @namespace Preference_Repository
 * @description Names
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const namePreferenceRepository = async (
    systemName?: string,
    accountName?: string,
): Promise<number> => {

    const response: {
        readonly changed: number;
    } = await Fetch
        .post
        .json(joinRoute('/preference/names'))
        .bearer(Brontosaurus.hard().raw)
        .add('systemName', systemName)
        .add('accountName', accountName)
        .fetch();

    console.log(response.changed);
    return response.changed;
};
