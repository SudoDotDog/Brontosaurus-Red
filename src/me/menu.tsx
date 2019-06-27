/**
 * @author WMXPY
 * @namespace Me
 * @description Menu
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as StyleMe from "../../style/me/me.scss";
import { MenuItem } from "./components/menu-item";

export type MeMenuProps = {
} & RouteComponentProps;

export const MeMenu: React.FC<MeMenuProps> = (props: MeMenuProps) => {

    return (<div className={StyleMe.menuGrid}>
        <MenuItem
            description="Change password"
            link="Change Password"
            onClick={() => props.history.push('/me/change-password')}
        />
        <MenuItem
            description="Enable two way authorization for better account security"
            link="Enable 2FA"
            onClick={() => props.history.push('/me/2fa')}
        />
    </div>);
};
