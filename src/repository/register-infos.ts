/**
 * @author WMXPY
 * @namespace Repository
 * @description Register
 */

import { Brontosaurus } from "@brontosaurus/web";

export const registerInfo = async (): Promise<any> => {

    const response: Response = await fetch('http://localhost:8080/preference/infos', {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + Brontosaurus.raw,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: "cors",
    });

    const data = await response.json();

    if (response.ok) {
        console.log(data);
        return data.registerInfos;
    }

    throw new Error(data);
};
