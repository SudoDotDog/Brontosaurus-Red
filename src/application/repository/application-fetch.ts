/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Application Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type ApplicationResponse = {
    expire: number;
    key: string;
    name: string;
    greenAccess: boolean;
    portalAccess: boolean;
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
