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
    password: string,
    infos: Record<string, Basics>,
): Promise<string> => {

    const response: {
        organization: string;
    } = await Fetch
        .post
        .json(joinRoute('/organization/inplode'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .add('username', username)
        .add('password', password)
        .add('infos', infos)
        .fetch();

    return response.organization;
};
