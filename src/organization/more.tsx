/**
 * @author WMXPY
 * @namespace Organization
 * @description More
 */

import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";
import { NamedTitle } from "../components/named-title";

export type OrganizationMoreProps = {
} & RouteComponentProps;

export const OrganizationMore: React.FC<OrganizationMoreProps> = (props: OrganizationMoreProps) => {

    const params: any = props.match.params;
    const organization: string = decodeURIComponent(params.organization);

    return (<div>
        <NeonSub onClick={() => props.history.goBack()}>Go Back</NeonSub>
        <NamedTitle about="More About Organization">
            {organization}
        </NamedTitle>
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
