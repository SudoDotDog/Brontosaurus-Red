/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Single Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SingleApplicationFetchResponse = {

    readonly avatar?: string;
    readonly name: string;
    readonly key: string;
    readonly expire: number;
    readonly groups: string[];
    readonly requires: string[];
    readonly green: string;
    readonly greenAccess: boolean;
    readonly portalAccess: boolean;
    readonly publicKey: string;
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

    return response.application;
};
