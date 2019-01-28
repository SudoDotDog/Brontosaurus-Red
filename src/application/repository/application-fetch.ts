/**
 * @author WMXPY
 * @namespace Application_Repository
 * @description Application Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";

export type ApplicationResponse = {
    expire: number;
    key: string;
    name: string;
};

export const fetchApplication = async (keyword: string): Promise<ApplicationResponse[]> => {

    const response: {
        applications: ApplicationResponse[];
    } = await Fetch
        .post
        .json('http://localhost:8080/application/fetch')
        .bearer(Brontosaurus.raw)
        .add('page', 0)
        .add('keyword', keyword)
        .fetch();

    console.log(response);
    return response.applications;
};
