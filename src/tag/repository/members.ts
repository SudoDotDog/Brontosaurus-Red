/**
 * @author WMXPY
 * @namespace Tag_Repository
 * @description Members
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type TagMemberElement = {

    readonly active: boolean;
    readonly username: string;
    readonly namespace: string;
    readonly displayName: string;
    readonly phone: string;
    readonly email: string;
};

export type TagMemberResponse = {

    readonly pages: number;
    readonly members: TagMemberElement[];
};

export const fetchTagMembers = async (tag: string, page: number): Promise<TagMemberResponse> => {

    const response: TagMemberResponse = await Fetch
        .post
        .json(joinRoute('/tag/members'))
        .bearer(Brontosaurus.hard().raw)
        .add('tag', tag)
        .add('page', page)
        .fetch();

    return response;
};
