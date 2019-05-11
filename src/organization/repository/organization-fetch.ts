/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Organization Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type OrganizationResponse = {

    name: string;
};

export const fetchOrganization = async (keyword: string): Promise<OrganizationResponse[]> => {

    const response: {
        organizations: OrganizationResponse[];
    } = await Fetch
        .post
        .json(joinRoute('/organization/fetch'))
        .bearer(Brontosaurus.raw)
        .add('page', 0)
        .add('keyword', keyword)
        .fetch();

    console.log(response);
    return response.organizations;
};
