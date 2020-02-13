/**
 * @author WMXPY
 * @namespace Preference_Repository
 * @description Read Mailer Source
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type ReadMailerSourceRepositoryResponse = {

    readonly resetPassword: string;
    readonly notification: string;
};

export const readMailerSourcePreferenceRepository = async (): Promise<ReadMailerSourceRepositoryResponse> => {

    const response: ReadMailerSourceRepositoryResponse = await Fetch
        .get
        .json(joinRoute('/preference/read/mailer-source'))
        .bearer(Brontosaurus.hard().raw)
        .fetch();

    return response;
};
