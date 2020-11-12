/**
 * @author WMXPY
 * @namespace Component
 * @description Link
 */

import * as React from "react";
import MenuStyle from "../../style/components/menu.scss";
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
            MenuStyle["clickable-span"],
        )}
    >
        {props.children}
    </a>);
};
