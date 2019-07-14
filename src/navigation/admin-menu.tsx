/**
 * @author WMXPY
 * @namespace Navigation
 * @description Admin Menu
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";

export type AdminMenuProps = {
} & RouteComponentProps;

export const AdminMenu: React.FC<AdminMenuProps> = (props: AdminMenuProps) => {

    return (<div className={MenuStyle.menuGrid}>
        <MenuItem
            description="View, Create, Modify Accounts"
            link="Account"
            onClick={() => props.history.push('/admin/user')}
        />
        <MenuItem
            description="View, Create, Modify Organizations"
            link="Organization"
            onClick={() => props.history.push('/admin/organization')}
        />
        <MenuItem
            description="View, Create, Modify Groups"
            link="Group"
            onClick={() => props.history.push('/admin/group')}
        />
        <MenuItem
            description="View, Create, Modify Decorators"
            link="Decorator"
            onClick={() => props.history.push('/admin/decorator')}
        />
        <MenuItem
            description="View, Create, Modify Tags"
            link="Tag"
            onClick={() => props.history.push('/admin/tag')}
        />
        <MenuItem
            description="View, Create, Modify Applications"
            link="Application"
            onClick={() => props.history.push('/admin/application')}
        />
        <MenuItem
            description="Modify Preferences"
            link="Preference"
            onClick={() => props.history.push('/admin/preference')}
        />
    </div>);
};
