/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Single Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

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
        .json(joinRoute('/application/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('key', key)
        .fetch();

    console.log(response);
    return response.application;
};
