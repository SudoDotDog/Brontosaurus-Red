/**
 * @author WMXPY
 * @namespace Organization
 * @description More
 */

import { MARGIN } from "@sudoo/neon/declare";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";

export type OrganizationMoreProps = {
} & RouteComponentProps;

export const OrganizationMore: React.FC<OrganizationMoreProps> = (props: OrganizationMoreProps) => {

    const params: any = props.match.params;
    const organization: string = decodeURIComponent(params.organization);

    return (<div>
        <NeonSub onClick={() => props.history.goBack()}>Go Back</NeonSub>
        <NeonTitle margin={MARGIN.SMALL}>More about Organization: {organization}</NeonTitle>
        <div className={MenuStyle.menuGrid}>
            <MenuItem
                description={`Add exist account to "${organization}" organization.`}
                link="Add"
                onClick={() => props.history.push('/admin/organization/a/' + encodeURIComponent(organization))}
            />
            <MenuItem
                disabled
                description={`Register new account for organization "${organization}"`}
                link="Register"
                onClick={() => undefined}
            />
        </div>
    </div>);
};
