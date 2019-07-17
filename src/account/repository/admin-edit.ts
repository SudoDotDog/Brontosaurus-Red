/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Admin Edit
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const editAccountAdminRepository = async (
    username: string,
    displayName: string | undefined,
    email: string | undefined,
    phone: string | undefined,
    groups: string[],
    tags: string[],
    decorators: string[],
    account: Partial<{
        beacons: Record<string, any>;
        infos: Record<string, any>;
    }>): Promise<string> => {

    const response: {
        readonly account: string;
    } = await Fetch
        .post
        .json(joinRoute('/account/edit/admin'))
        .bearer(Brontosaurus.hard().raw)
        .add('groups', groups)
        .add('tags', tags)
        .add('decorators', decorators)
        .add('displayName', displayName)
        .add('email', email)
        .add('phone', phone)
        .add('username', username)
        .add('account', account)
        .fetch();

    return response.account;
};
