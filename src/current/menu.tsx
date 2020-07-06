/**
 * @author WMXPY
 * @namespace Current
 * @description Menu
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as StyleMe from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";

export type CurrentMenuProps = {
} & RouteComponentProps;

export const CurrentMenu: React.FC<CurrentMenuProps> = (props: CurrentMenuProps) => {

    return (<div className={StyleMe["menu-grid"]}>
        <MenuItem
            description="Register sub account for your organization"
            link="Register"
            onClick={() => props.history.push('/current/register')}
        />
    </div>);
};
