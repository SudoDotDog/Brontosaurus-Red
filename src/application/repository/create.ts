/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Create
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const createApplication = async (
    name: string,
    key: string,
    expire: number,
    token: string,
): Promise<string> => {

    const response: {
        application: string;
    } = await Fetch
        .post
        .json(joinRoute('/application/create'))
        .bearer(Brontosaurus.hard().raw)
        .migrate({
            name,
            key,
            expire,
            token,
        })
        .fetch();

    return response.application;
};
