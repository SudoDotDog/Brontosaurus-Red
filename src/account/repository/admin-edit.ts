/**
 * @author WMXPY
 * @namespace User_Repository
 * @description Admin Edit
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const editAccountAdminRepository = async (
    username: string,
    groups: string[],
    account: Partial<{
        beacons: Record<string, any>;
        infos: Record<string, any>;
    }>): Promise<void> => {

    const response = await Fetch
        .post
        .json(joinRoute('/account/edit/admin'))
        .bearer(Brontosaurus.hard().raw)
        .add('groups', groups)
        .add('username', username)
        .add('account', account)
        .fetch();

    console.log(response);
};
