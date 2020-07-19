/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Register
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type RegisterInfoElement = {

    readonly name: string;
    readonly type: string;
};

export const registerInfo = async (): Promise<RegisterInfoElement[]> => {

    const response: {
        readonly registerInfos: RegisterInfoElement[];
    } = await Fetch
        .get
        .withJson(joinRoute('/preference/infos'))
        .bearer(Brontosaurus.hard().raw)
        .fetchJson();

    return response.registerInfos;
};
