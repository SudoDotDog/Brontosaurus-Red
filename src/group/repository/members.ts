/**
 * @author WMXPY
 * @namespace Group_Repository
 * @description Members
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type GroupMemberElement = {

    readonly active: boolean;
    readonly username: string;
    readonly namespace: string;
    readonly displayName: string;
    readonly phone: string;
    readonly email: string;
};

export type GroupMemberResponse = {

    readonly pages: number;
    readonly members: GroupMemberElement[];
};

export const fetchGroupMembers = async (group: string, page: number): Promise<GroupMemberResponse> => {

    const response: GroupMemberResponse = await Fetch
        .post
        .json(joinRoute('/group/members'))
        .bearer(Brontosaurus.hard().raw)
        .add('group', group)
        .add('page', page)
        .fetch();

    return response;
};
