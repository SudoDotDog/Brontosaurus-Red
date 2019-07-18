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
    displayName: string | undefined,
    email: string | undefined,
    phone: string | undefined,
    infos: Record<string, Basics>,
    tags: string[],
): Promise<string> => {

    const obj: Record<string, any> = {
        name,
        username,
        infos,
        tags,
    };

    if (displayName && displayName.length > 0) {
        obj.displayName = displayName;
    }
    if (email && email.length > 0) {
        obj.email = email;
    }
    if (phone && phone.length > 0) {
        obj.phone = phone;
    }

    const response: {
        account: string;
        organization: string;
        tempPassword: string;
    } = await Fetch
        .post
        .json(joinRoute('/organization/inplode'))
        .bearer(Brontosaurus.hard().raw)
        .migrate(obj)
        .fetch();

    return response.tempPassword;
};
