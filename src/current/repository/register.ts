/**
 * @author WMXPY
 * @namespace Current_Repository
 * @description Current Register
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const registerForOrganization = async (
    username: string,
    email?: string,
    phone?: string,
): Promise<string> => {

    const response: {
        account: string;
        tempPassword: string;
    } = await Fetch
        .post
        .json(joinRoute('/organization/register'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('email', email)
        .add('phone', phone)
        .add('infos', {})
        .fetch();

    return response.tempPassword;
};
