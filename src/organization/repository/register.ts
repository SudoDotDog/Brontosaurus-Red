/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Organization Register Sub
 */

import { Basics } from "@brontosaurus/definition";
import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const registerSubOrganization = async (
    organizationName: string,
    username: string,
    displayName: string | undefined,
    email: string | undefined,
    phone: string | undefined,
    infos: Record<string, Basics>,
): Promise<string> => {

    const obj: Record<string, any> = {
        organization: organizationName,
        username,
        infos,
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
        tempPassword: string;
    } = await Fetch
        .post
        .json(joinRoute('/organization/sub-register'))
        .bearer(Brontosaurus.hard().raw)
        .migrate(obj)
        .fetch();

    return response.tempPassword;
};
