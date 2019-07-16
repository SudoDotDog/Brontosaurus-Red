/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Organization Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type OrganizationResponse = {

    readonly name: string;
    readonly owner: string;
    readonly ownerDisplayName?: string;
    readonly decorators: number;
    readonly tags: number;
};

export type FetchOrganizationResponse = {

    readonly organizations: OrganizationResponse[];
    readonly pages: number;
};

export const fetchOrganization = async (keyword: string, page: number): Promise<FetchOrganizationResponse> => {

    const response: FetchOrganizationResponse = await Fetch
        .post
        .json(joinRoute('/organization/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword)
        .fetch();

    return response;
};
