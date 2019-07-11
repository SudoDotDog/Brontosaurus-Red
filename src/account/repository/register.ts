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
    password: string,
    email: string,
    phone: string,
    infos: Record<string, Basics>,
    tags: string[],
    groups: string[],
): Promise<string> => {

    const response: RegisterRepositoryResponse = await Fetch
        .post
        .json(joinRoute('/account/register'))
        .bearer(Brontosaurus.hard().raw)
        .migrate({
            username,
            password,
            email,
            phone,
            infos,
            tags,
            groups,
        })
        .fetch();

    return response.account;
};
