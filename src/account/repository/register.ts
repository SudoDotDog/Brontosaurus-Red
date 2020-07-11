/**
 * @author WMXPY
 * @namespace Account_Repository
 * @description Register
 */

import { Basics } from "@brontosaurus/definition";
import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export type RegisterRepositoryResponse = {

    readonly account: string;
};

export const registerRepository = async (
    username: string,
    namespace: string,
    displayName: string | undefined,
    password: string,
    email: string,
    phone: string,
    infos: Record<string, Basics>,
    tags: string[],
    groups: string[],
): Promise<string> => {

    const obj: Record<string, any> = {
        username,
        namespace,
        password,
        email,
        phone,
        infos,
        tags,
        groups,
    };

    if (displayName && displayName.length > 0) {
        obj.displayName = displayName;
    }

    const response: RegisterRepositoryResponse = await Fetch
        .post
        .withJson(joinRoute('/account/register'))
        .bearer(Brontosaurus.hard().raw)
        .migrate(obj)
        .fetchJson();

    return response.account;
};
