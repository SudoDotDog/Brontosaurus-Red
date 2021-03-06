/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Organization Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type OrganizationResponse = {

    readonly active: boolean;
    readonly name: string;
    readonly owner: string;
    readonly ownerNamespace: string;
    readonly ownerActive: boolean;
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
        .withJson(joinRoute('/organization/fetch'))
        .bearer(Brontosaurus.hard().raw)
        .add('page', page)
        .add('keyword', keyword)
        .fetchJson();

    return response;
};
