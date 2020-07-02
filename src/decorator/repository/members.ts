/**
 * @author WMXPY
 * @namespace Decorator_Repository
 * @description Members
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type DecoratorMemberElement = {

    readonly active: boolean;
    readonly username: string;
    readonly namespace: string;
    readonly displayName: string;
    readonly phone: string;
    readonly email: string;
};

export type DecoratorMemberResponse = {

    readonly pages: number;
    readonly members: DecoratorMemberElement[];
};

export const fetchDecoratorMembers = async (decorator: string, page: number): Promise<DecoratorMemberResponse> => {

    const response: DecoratorMemberResponse = await Fetch
        .post
        .json(joinRoute('/decorator/members'))
        .bearer(Brontosaurus.hard().raw)
        .add('decorator', decorator)
        .add('page', page)
        .fetch();

    return response;
};
