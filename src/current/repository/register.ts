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
    password: string,
    email?: string,
    phone?: string,
): Promise<string> => {

    const response: {
        organization: string;
    } = await Fetch
        .post
        .json(joinRoute('/organization/register'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', username)
        .add('password', password)
        .add('email', email)
        .add('phone', phone)
        .add('infos', {})
        .fetch();

    return response.organization;
};
