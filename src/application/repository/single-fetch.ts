/**
 * @author WMXPY
 * @namespace Appliaction_Repository
 * @description Single Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";

export type SingleApplicationFetchResponse = {
    avatar?: string;
    name: string;
    key: string;
    expire: number;
    groups: string[];
};

export const singleFetchApplicationRepository = async (key: string): Promise<SingleApplicationFetchResponse> => {

    const response: {
        application: SingleApplicationFetchResponse;
    } = await Fetch
        .post
        .json('http://localhost:8080/appliaction/single')
        .bearer(Brontosaurus.raw)
        .add('key', key)
        .fetch();

    console.log(response);
    return response.application;
};
