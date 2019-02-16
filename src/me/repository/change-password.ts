/**
 * @author WMXPY
 * @namespace Me_Repository
 * @description Change Password
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";

export const editPassword = async (password: string): Promise<string> => {

    const response: {
        account: string;
    } = await Fetch
        .post
        .json('http://localhost:8080/account/edit/password')
        .bearer(Brontosaurus.raw)
        .add('username', Brontosaurus.username)
        .add('password', password)
        .fetch();

    console.log(response);
    return response.account;
};
