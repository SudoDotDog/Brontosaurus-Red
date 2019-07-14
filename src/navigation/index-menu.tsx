/**
 * @author WMXPY
 * @namespace Navigation
 * @description Index Menu
 */

import { EnableForGroup } from "@brontosaurus/react";
import { Brontosaurus, Token } from "@brontosaurus/web";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";

export type IndexMenuBaseProps = {

    readonly accountName: string;
    readonly commandCenterName: string;
};

export type IndexMenuProps = IndexMenuBaseProps & RouteComponentProps;

export const IndexMenuBase: React.FC<IndexMenuProps> = (props: IndexMenuProps) => {

    const token: Token = Brontosaurus.hard();

    const username: string = token.username;
    const organization: string | undefined = token.organization;

    return (<div className={MenuStyle.menuGrid}>
        <MenuItem
            description={`As a ${props.accountName} User, change ${username}'s password or modify account settings`}
            link="My Account"
            onClick={() => props.history.push('/me')}
        />
        <EnableForGroup
            visit={false}
            group={['BRONTOSAURUS_ORGANIZATION_CONTROL']}>
            <MenuItem
                description={`As a organization manager, create account for ${organization} or change ${organization}'s setting`}
                link="My Organization"
                onClick={() => props.history.push('/current')}
            />
        </EnableForGroup>
        <EnableForGroup
            visit={false}
            group={['BRONTOSAURUS_SUPER_ADMIN']}>
            <MenuItem
                description={`As a ${props.commandCenterName} super administrator, access Admin Panel`}
                link="Admin Panel"
                onClick={() => props.history.push('/admin')}
            />
        </EnableForGroup>
    </div>);
};

export const IndexMenu: React.ComponentType<IndexMenuBaseProps> = IndexMenuBase as any;
