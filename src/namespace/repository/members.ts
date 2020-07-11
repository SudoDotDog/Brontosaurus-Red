/**
 * @author WMXPY
 * @namespace Namespace_Repository
 * @description Members
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type NamespaceMemberElement = {

    readonly active: boolean;
    readonly username: string;
    readonly namespace: string;
    readonly displayName: string;
    readonly phone: string;
    readonly email: string;
};

export type NamespaceMemberResponse = {

    readonly pages: number;
    readonly members: NamespaceMemberElement[];
};

export const fetchNamespaceMembers = async (namespace: string, page: number): Promise<NamespaceMemberResponse> => {

    const response: NamespaceMemberResponse = await Fetch
        .post
        .withJson(joinRoute('/namespace/members'))
        .bearer(Brontosaurus.hard().raw)
        .add('namespace', namespace)
        .add('page', page)
        .fetchJson();

    return response;
};
