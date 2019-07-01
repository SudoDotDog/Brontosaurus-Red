/**
 * @author WMXPY
 * @namespace Preference
 * @description Menu
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as StyleMenu from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";

export type PreferenceMenuProps = {
} & RouteComponentProps;

export const PreferenceMenu: React.FC<PreferenceMenuProps> = (props: PreferenceMenuProps) => {

    return (<div className={StyleMenu.menuGrid}>
        <MenuItem
            description="View and manage global preference setting"
            link="Global"
            onClick={() => props.history.push('/preference/global')}
        />
        <MenuItem
            description="View and manage names preference setting"
            link="Names"
            onClick={() => props.history.push('/preference/names')}
        />
    </div>);
};
