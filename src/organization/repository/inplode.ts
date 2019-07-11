/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Organization Inplode
 */

import { Basics } from "@brontosaurus/definition";
import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const inplodeOrganization = async (
    name: string,
    username: string,
    email: string,
    phone: string,
    infos: Record<string, Basics>,
    tags: string[],
): Promise<string> => {

    const response: {
        account: string;
        organization: string;
        tempPassword: string;
    } = await Fetch
        .post
        .json(joinRoute('/organization/inplode'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .add('username', username)
        .add('email', email)
        .add('phone', phone)
        .add('infos', infos)
        .add('tags', tags)
        .fetch();

    return response.tempPassword;
};
