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

export type OrganizationMoreProps = {
} & RouteComponentProps;

export const OrganizationMore: React.FC<OrganizationMoreProps> = (props: OrganizationMoreProps) => {

    const params: any = props.match.params;

    return (<div>
        <NeonSub onClick={() => props.history.goBack()}>Go Back</NeonSub>
        <div className={MenuStyle.menuGrid}>
            <MenuItem
                description="Add account to this organization"
                link="Add"
                onClick={() => props.history.push('/a/' + params.organization)}
            />
        </div>
    </div>);
};
