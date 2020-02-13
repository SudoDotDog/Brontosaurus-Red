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
        .json(joinRoute('/preference/read/mailer-transport'))
        .bearer(Brontosaurus.hard().raw)
        .fetch();

    return response.config;
};
