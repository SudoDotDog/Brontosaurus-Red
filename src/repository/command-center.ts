/**
 * @author WMXPY
 * @namespace Repository
 * @description Command Center
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "./route";

export const getCommandCenterName = async (): Promise<string | null> => {

    const response: {
        exist: boolean;
        commandCenterName?: string;
    } = await Fetch
        .get
        .json(joinRoute('/preference/command-center'))
        .bearer(Brontosaurus.hard().raw)
        .fetch();

    if (response.exist) {
        return response.commandCenterName as string;
    }

    return null;
};
