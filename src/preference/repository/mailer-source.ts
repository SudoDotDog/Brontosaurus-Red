/**
 * @author WMXPY
 * @namespace Preference_Repository
 * @description Mailer Source
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const mailerSourcePreferenceRepository = async (resetPassword: string, notification: string): Promise<number> => {

    const response: {
        changed: number;
    } = await Fetch
        .post
        .json(joinRoute('/preference/mailer-source'))
        .bearer(Brontosaurus.hard().raw)
        .add('resetPassword', resetPassword)
        .add('notification', notification)
        .fetch();

    return response.changed;
};
