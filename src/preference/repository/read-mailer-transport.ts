/**
 * @author WMXPY
 * @namespace Preference_Repository
 * @description Read Mailer Transport
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type ReadMailerTransportRepositoryResponse = {

    readonly config: string;
};

export const readMailerTransportPreferenceRepository = async (): Promise<string> => {

    const response: ReadMailerTransportRepositoryResponse = await Fetch
        .get
        .withJson(joinRoute('/preference/read/mailer-transport'))
        .bearer(Brontosaurus.hard().raw)
        .fetchJson();

    return response.config;
};
