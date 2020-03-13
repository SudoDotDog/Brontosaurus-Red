/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Account Deactivate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const deactivateAccount = async (username: string, namespace: string): Promise<string> => {

    const response: {
        deactivated: string;
    } = await Fetch
        .post
        .json(joinRoute('/account/deactivate'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('namespace', namespace)
        .fetch();

    return response.deactivated;
};
