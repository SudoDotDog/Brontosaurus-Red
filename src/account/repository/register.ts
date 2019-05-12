/**
 * @author WMXPY
 * @namespace User_Repository
 * @description Register
 */

import { Basics } from "@brontosaurus/definition";
import { Brontosaurus } from "@brontosaurus/web";

export const register = async (username: string, password: string, infos: Record<string, Basics>): Promise<string> => {

    const payload: string = JSON.stringify({
        username,
        password,
        infos,
    });

    const response: Response = await fetch('http://localhost:8080/account/register', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + Brontosaurus.hard().raw,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: "cors",
        body: payload,
    });

    const data = await response.json();

    if (response.ok) {
        return data.account;
    }

    throw new Error(data);
};
