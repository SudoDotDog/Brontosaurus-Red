/**
 * @author WMXPY
 * @namespace Page
 * @description Nav Button
 */

import * as React from "react";
import * as NavStyle from "../../style/page/nav.scss";
import { combineClasses } from "../util/style";

export type NavButtonProps = {

    readonly onClick: () => void;
    readonly selected: boolean;

    readonly children?: any;
};

export const NavButton: React.FC<NavButtonProps> = (props: NavButtonProps) => {

    return (<button
        className={combineClasses(
            NavStyle.commonButton,
            NavStyle.navButton,
            props.selected ? NavStyle.selected : null,
        )}
        onClick={props.onClick}
    >
        {props.children}
    </button>);
};
