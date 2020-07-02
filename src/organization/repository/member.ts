/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Members
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type OrganizationMemberElement = {

    readonly active: boolean;
    readonly username: string;
    readonly namespace: string;
    readonly displayName: string;
    readonly phone: string;
    readonly email: string;
};

export type OrganizationMemberOwner = {

    readonly username: string;
    readonly namespace: string;
};

export type OrganizationMemberResponse = {

    readonly pages: number;
    readonly owner: OrganizationMemberOwner;
    readonly members: OrganizationMemberElement[];
};

export const fetchOrganizationMembers = async (organization: string, page: number): Promise<OrganizationMemberResponse> => {

    const response: OrganizationMemberResponse = await Fetch
        .post
        .json(joinRoute('/organization/members'))
        .bearer(Brontosaurus.hard().raw)
        .add('organization', organization)
        .add('page', page)
        .fetch();

    return response;
};
