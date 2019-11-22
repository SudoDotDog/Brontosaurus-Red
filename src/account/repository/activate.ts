/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Account Activate
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const activateAccount = async (username: string): Promise<string> => {

    const response: {
        activated: string;
    } = await Fetch
        .post
        .json(joinRoute('/account/activate'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .fetch();

    return response.activated;
};
