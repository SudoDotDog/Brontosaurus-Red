/**
 * @author WMXPY
 * @namespace Preference_Repository
 * @description Mailer Transport
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const mailerTransportPreferenceRepository = async (config: string): Promise<boolean> => {

    const response: {
        changed: boolean;
    } = await Fetch
        .post
        .withJson(joinRoute('/preference/mailer-transport'))
        .bearer(Brontosaurus.hard().raw)
        .add('config', config)
        .fetchJson();

    return response.changed;
};
