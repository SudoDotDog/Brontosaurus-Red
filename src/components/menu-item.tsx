/**
 * @author WMXPY
 * @namespace Me
 * @description Menu
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE, WIDTH } from "@sudoo/neon/declare";
import * as React from "react";
import StyleMenu from "../../style/components/menu.scss";
import { combineClasses } from "../util/style";

export type MenuItemProps = {

    readonly description: any;
    readonly link: string;
    readonly onClick: () => void;

    readonly disabled?: boolean;
    readonly dangerous?: boolean;
};

export const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {

    return (<div className={StyleMenu["menu-item"]}>
        <div className={StyleMenu["menu-description"]}>
            {props.description}
        </div>
        <NeonButton
            buttonClassName={combineClasses(
                props.dangerous ? StyleMenu["menu-dangerous"] : undefined,
            )}
            disabled={props.disabled}
            size={SIZE.MEDIUM}
            width={WIDTH.FULL}
            onClick={props.onClick}
        >
            {props.link}
        </NeonButton>
    </div>);
};
