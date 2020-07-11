/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Register
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const registerInfo = async (): Promise<any> => {

    const response: any = await Fetch
        .get
        .withJson(joinRoute('/preference/infos'))
        .bearer(Brontosaurus.hard().raw)
        .fetchJson();

    return response.registerInfos;
};
