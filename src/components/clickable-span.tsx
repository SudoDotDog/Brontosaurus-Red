/**
 * @author WMXPY
 * @namespace Component
 * @description Clickable Span
 */

import * as React from "react";
import { Link } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { combineClasses } from "../util/style";

export type ClickableSpanProps = {

    readonly to: string;
    readonly red?: boolean;
    readonly className?: string;

    readonly children?: any;
};

export const ClickableSpan: React.FC<ClickableSpanProps> = (props: ClickableSpanProps) => {

    return (<Link
        to={props.to}
        className={combineClasses(
            props.className,
            MenuStyle.clickableSpan,
            props.red ? MenuStyle.clickableSpanRed : null,
        )}
    >
        {props.children}
    </Link>);
};
