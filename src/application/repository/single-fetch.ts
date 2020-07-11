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

    readonly active: boolean;
    readonly avatar?: string;
    readonly favicon?: string;
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
        .withJson(joinRoute('/application/single'))
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
        .fetchJson();

    return response.application;
};
