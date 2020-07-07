/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Application Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";
import { ApplicationRedirection } from "../../common/declare";

export type ApplicationResponse = {

    readonly active: boolean;
    readonly expire: number;
    readonly key: string;
    readonly name: string;
    readonly greenAccess: boolean;
    readonly portalAccess: boolean;

    readonly redirections: ApplicationRedirection[];
    readonly iFrameProtocol: boolean;
    readonly postProtocol: boolean;
    readonly alertProtocol: boolean;
    readonly noneProtocol: boolean;
};

export type FetchApplicationResponse = {

    applications: ApplicationResponse[];
    pages: number;
};

export const fetchApplication = async (keyword: string, page: number): Promise<FetchApplicationResponse> => {

    const response: FetchApplicationResponse = await Fetch
        .post
        .json(joinRoute('/application/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword)
        .fetch();

    return response;
};
