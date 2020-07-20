/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Update
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";
import { SingleApplicationFetchResponse } from "./single-fetch";
import { produce } from "@sudoo/immutable";

export const updateApplicationRepository = async (application: SingleApplicationFetchResponse): Promise<string> => {

    const parsedApplication: SingleApplicationFetchResponse = produce(application, (draft: SingleApplicationFetchResponse) => {

        (draft as any).expire = Number(draft.expire);
        for (const redirection of draft.redirections) {
            delete redirection.identifier;
        }
    });

    const response: {
        application: string;
    } = await Fetch
        .post
        .withJson(joinRoute('/application/update'))
        .bearer(Brontosaurus.hard().raw)
        .add('key', application.key)
        .add('application', parsedApplication)
        .fetchJson();

    return response.application;
};
