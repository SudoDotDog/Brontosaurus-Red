/**
 * @author WMXPY
 * @namespace User_Repository
 * @description Single Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";

export type SingleFetchResponse = {
    username: string;
    beacons: Record<string, any>;
    infos: Record<string, any>;
    groups: string[];
};

export const singleFetchRepository = async (username: string): Promise<SingleFetchResponse> => {

    const response: {
        account: SingleFetchResponse;
    } = await Fetch
        .post
        .json('http://localhost:8080/account/single')
        .bearer(Brontosaurus.raw)
        .add('username', username)
        .fetch();

    console.log(response);
    return response.account;
};