/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Single
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type SingleGroupResponse = {

    readonly name: string;
    readonly members: Array<{
        readonly username: string;
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
        .json(joinRoute('/group/single'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .fetch();

    return response;
};
