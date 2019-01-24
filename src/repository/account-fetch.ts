/**
 * @author WMXPY
 * @namespace Repository
 * @description Account Fetch
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";

export const fetchAccount = async (keyword: string): Promise<any> => {

    const response = await Fetch
        .post
        .json('http://localhost:8080/account/fetch')
        .bearer(Brontosaurus.raw)
        .add('page', 0)
        .add('keyword', keyword)
        .fetch();

    console.log(response);
};
