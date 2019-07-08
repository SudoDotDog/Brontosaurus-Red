/**
 * @author WMXPY
 * @namespace Account
 * @description More
 */

import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";

export type AccountMoreProps = {
} & RouteComponentProps;

export const AccountMore: React.FC<AccountMoreProps> = (props: AccountMoreProps) => {

    const params: any = props.match.params;

    return (<div>
        <NeonSub onClick={() => props.history.goBack()}>Go Back</NeonSub>
        <div className={MenuStyle.menuGrid}>
            <MenuItem
                description="Assign this account to an organization"
                link="Assign"
                onClick={() => props.history.push('/me/' + params.username)}
            />
        </div>
    </div>);
};
