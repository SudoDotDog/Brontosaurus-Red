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
    namespace: string,
    displayName?: string,
    email?: string,
    phone?: string,
): Promise<string> => {

    const obj: Record<string, any> = {
        username,
        namespace,
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
        .json(joinRoute('/organization/flat/register'))
        .bearer(Brontosaurus.hard().raw)
        .migrate(obj)
        .add('infos', {})
        .fetch();

    return response.tempPassword;
};
