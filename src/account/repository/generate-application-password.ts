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

export const generateApplicationPasswordRepository = async (username: string): Promise<GenerateApplicationPasswordResponse> => {

    const response: GenerateApplicationPasswordResponse = await Fetch
        .post
        .json(joinRoute('/account/generate-application-password'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .fetch();

    return response;
};
