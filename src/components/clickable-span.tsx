/**
 * @author WMXPY
 * @namespace Component
 * @description Clickable Span
 */

import * as React from "react";
import * as MenuStyle from "../../style/components/menu.scss";
import { combineClasses } from "../util/style";

export type ClickableSpanProps = {

    readonly onClick: () => void;
    readonly className?: string;

    readonly children?: any;
};

export const ClickableSpan: React.FC<ClickableSpanProps> = (props: ClickableSpanProps) => {

    return (<span
        onClick={props.onClick}
        className={combineClasses(
            props.className,
            MenuStyle.clickableSpan,
        )}
    >
        {props.children}
    </span>);
};
