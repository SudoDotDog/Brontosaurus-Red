/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Generate Temporary Password
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type GenerateTemporaryPasswordResponse = {

    readonly username: string;
    readonly password: string;
};

export const generateTemporaryPasswordRepository = async (username: string, namespace: string): Promise<GenerateTemporaryPasswordResponse> => {

    const response: GenerateTemporaryPasswordResponse = await Fetch
        .post
        .withJson(joinRoute('/account/generate-temporary-password'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .fetchJson();

    return response;
};
