/**
 * @author WMXPY
 * @namespace Navigation
 * @description Sub Button
 */

import * as React from "react";
import * as NavStyle from "../../style/page/nav.scss";
import { combineClasses } from "../util/style";

export type SubButtonProps = {

    readonly onClick: () => void;
    readonly selected: boolean;

    readonly children?: any;
};

export const SubButton: React.FC<SubButtonProps> = (props: SubButtonProps) => {

    return (<button
        className={combineClasses(
            NavStyle.commonButton,
            NavStyle.subButton,
            props.selected ? NavStyle.selected : null,
        )}
        onClick={props.onClick}
    >
        {props.children}
    </button>);
};
