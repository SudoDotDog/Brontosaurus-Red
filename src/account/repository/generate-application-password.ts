/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Generate Application Password
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type GenerateApplicationPasswordResponse = {

    readonly username: string;
    readonly password: string;
};

export const generateApplicationPasswordRepository = async (username: string, namespace: string): Promise<GenerateApplicationPasswordResponse> => {

    const response: GenerateApplicationPasswordResponse = await Fetch
        .post
        .withJson(joinRoute('/account/generate-application-password'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .fetchJson();

    return response;
};
