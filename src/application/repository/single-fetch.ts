/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Single Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { ApplicationRedirection } from "../../common/declare";
import { joinRoute } from "../../repository/route";
import { randomUnique } from "@sudoo/random";

export type SingleApplicationFetchResponse = {

    readonly avatar?: string;
    readonly name: string;
    readonly key: string;
    readonly expire: number;
    readonly groups: string[];

    readonly redirections: ApplicationRedirection[];
    readonly iFrameProtocol: boolean;
    readonly postProtocol: boolean;
    readonly alertProtocol: boolean;
    readonly noneProtocol: boolean;

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
        .debugResponse()
        .bearer(Brontosaurus.hard().raw)
        .add('key', key)
        .addProducePostProcessFunction((draft: {
            application: SingleApplicationFetchResponse;
        }) => {
            for (const redirection of draft.application.redirections) {
                redirection.identifier = randomUnique();
            }
        })
        .fetch();

    return response.application;
};
