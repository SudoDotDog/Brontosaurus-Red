/**
 * @author WMXPY
 * @namespace Component
 * @description Named Title
 */

import * as React from "react";
import * as MenuStyle from "../../style/components/menu.scss";
import { combineClasses } from "../util/style";

export type NamedTitleProps = {

    readonly about: string;
    readonly className?: string;

    readonly children?: any;
};

export const NamedTitle: React.FC<NamedTitleProps> = (props: NamedTitleProps) => {

    return (<div
        className={combineClasses(
            props.className,
            MenuStyle["named-title"],
        )}
    >
        <div className={MenuStyle["named-title-about"]}>{props.about}</div>
        <div className={MenuStyle["named-title-name"]}>{props.children}</div>
    </div>);
};
