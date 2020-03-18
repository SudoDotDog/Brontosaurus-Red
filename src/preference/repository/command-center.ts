/**
 * @author WMXPY
 * @namespace Preference_Repository
 * @description Command Center
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type GetCommandCenterNameResponse = {

    readonly existAccountName: string;
    readonly existCommandCenterName: string;
    readonly commandCenterName?: string;
    readonly accountName?: string;
};

export const getCommandCenterName = async (): Promise<GetCommandCenterNameResponse> => {

    const response: GetCommandCenterNameResponse = await Fetch
        .get
        .json(joinRoute('/preference/command-center'))
        .bearer(Brontosaurus.hard().raw)
        .fetch();

    return response;
};
