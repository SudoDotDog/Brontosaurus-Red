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
} & Partial<SingleApplicationFetchResponse>): Promise<void> => {

    const response: {
        application: SingleApplicationFetchResponse;
    } = await Fetch
        .post
        .json(joinRoute('/application/update'))
        .bearer(Brontosaurus.hard().raw)
        .add('key', application.key)
        .add('application', application)
        .fetch();

    console.log(response);
};
