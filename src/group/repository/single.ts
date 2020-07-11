/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Single
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SingleGroupResponse = {

    readonly active: boolean;
    readonly name: string;
    readonly members: Array<{
        readonly active: boolean;
        readonly username: string;
        readonly namespace: string;
        readonly displayName: string;
        readonly phone: string;
        readonly email: string;
    }>;
    readonly description?: string;
    readonly decorators: string[];
};

export const singleGroup = async (name: string): Promise<SingleGroupResponse> => {

    const response: SingleGroupResponse = await Fetch
        .post
        .withJson(joinRoute('/group/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .fetchJson();

    return response;
};
