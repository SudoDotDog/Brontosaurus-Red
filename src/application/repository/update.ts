/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Update
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";
import { SingleApplicationFetchResponse } from "./single-fetch";

export const updateApplicationRepository = async (application: {
    key: string;
} & Partial<SingleApplicationFetchResponse>): Promise<string> => {

    const response: {
        application: string;
    } = await Fetch
        .post
        .json(joinRoute('/application/update'))
        .bearer(Brontosaurus.hard().raw)
        .add('key', application.key)
        .add('application', application)
        .fetch();

    return response.application;
};
