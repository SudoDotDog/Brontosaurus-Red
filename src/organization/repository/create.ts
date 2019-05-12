/**
 * @author WMXPY
 * @namespace Organization_Repository
 * @description Organization Create
 */

import { Brontosaurus } from "@brontosaurus/web";
import { Fetch } from "@sudoo/fetch";
import { joinRoute } from "../../repository/route";

export const createOrganization = async (name: string): Promise<string> => {

    const response: {
        organization: string;
    } = await Fetch
        .post
        .json(joinRoute('/organization/create'))
        .bearer(Brontosaurus.hard().raw)
        .add('name', name)
        .fetch();

    return response.organization;
};
