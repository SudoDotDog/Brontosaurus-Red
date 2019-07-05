/**
 * @author WMXPY
 * @namespace User_Repository
 * @description Single Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SingleFetchResponse = {
    username: string;
    email?: string;
    phone?: string;
    organization?: {
        name: string;
        owner: string;
    };
    twoFA: boolean;
    beacons: Record<string, any>;
    infos: Record<string, any>;
    decorators: string[];
    groups: string[];
};

export const singleFetchRepository = async (username: string): Promise<SingleFetchResponse> => {

    const response: {
        account: SingleFetchResponse;
    } = await Fetch
        .post
        .json(joinRoute('/account/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .fetch();

    console.log(response);
    return response.account;
};
