/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Single
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SingleOrganizationResponse = {

    readonly active: boolean;
    readonly name: string;
    readonly owner: {
        readonly active: boolean;
        readonly username: string;
        readonly namespace: string;
        readonly phone: string;
        readonly email: string;
    };
    readonly members: Array<{
        readonly active: boolean;
        readonly username: string;
        readonly displayName: string;
        readonly phone: string;
        readonly email: string;
    }>;
    readonly limit: number;
    readonly decorators: string[];
    readonly tags: string[];
};

export const singleOrganization = async (name: string): Promise<SingleOrganizationResponse> => {

    const response: SingleOrganizationResponse = await Fetch
        .post
        .json(joinRoute('/organization/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .fetch();

    return response;
};
