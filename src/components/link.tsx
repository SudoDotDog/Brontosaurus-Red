/**
 * @author WMXPY
 * @namespace Component
 * @description Link
 */

import * as React from "react";
import * as MenuStyle from "../../style/components/menu.scss";
import { combineClasses } from "../util/style";

export type LinkProps = {

    readonly href: string;
    readonly className?: string;

    readonly children?: any;
};

export const Link: React.FC<LinkProps> = (props: LinkProps) => {

    return (<a
        target="_blank"
        rel="noreferrer"
        href={props.href}
        className={combineClasses(
            props.className,
            MenuStyle.clickableSpan,
        )}
    >
        {props.children}
    </a>);
};
