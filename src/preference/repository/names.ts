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
    commandCenterName?: string,
): Promise<number> => {

    const response: {
        readonly changed: number;
    } = await Fetch
        .post
        .withJson(joinRoute('/preference/names'))
        .bearer(Brontosaurus.hard().raw)
        .add('systemName', systemName)
        .add('accountName', accountName)
        .add('commandCenterName', commandCenterName)
        .fetchJson();

    return response.changed;
};
