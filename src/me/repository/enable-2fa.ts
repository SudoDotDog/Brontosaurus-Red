/**
 * @author WMXPY
 * @namespace Me_Repository
 * @description Enable TwoFA
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const enable2FA = async (): Promise<string> => {

    const response: {
        secret: string;
        qrcode: string;
    } = await Fetch
        .post
        .json(joinRoute('/account/self/enable-2fa'))
        .bearer(Brontosaurus.hard().raw)
        .add('username', Brontosaurus.hard().username)
        .fetch();

    return response.qrcode;
};
