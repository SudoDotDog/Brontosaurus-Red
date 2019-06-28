/**
 * @author WMXPY
 * @namespace User_Repository
 * @description Register
 */

import { Basics } from "@brontosaurus/definition";
import { Brontosaurus } from "@brontosaurus/web";
import { joinRoute } from "../../repository/route";

export const register = async (username: string, password: string, email: string, phone: string, infos: Record<string, Basics>): Promise<string> => {

    const payload: string = JSON.stringify({
        username,
        password,
        email,
        phone,
        infos,
    });

    const response: Response = await fetch(joinRoute('/account/register'), {
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
