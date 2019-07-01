/**
 * @author WMXPY
 * @namespace Me
 * @description Menu
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE, WIDTH } from "@sudoo/neon/declare";
import * as React from "react";
import * as StyleMe from "../../style/components/menu.scss";

export type MenuItemProps = {

    readonly description: any;
    readonly link: string;
    readonly onClick: () => void;
};

export const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {

    return (<div className={StyleMe.menuItem}>
        <div className={StyleMe.menuDescription}>
            {props.description}
        </div>
        <NeonButton
            size={SIZE.MEDIUM}
            width={WIDTH.FULL}
            onClick={props.onClick}
        >
            {props.link}
        </NeonButton>
    </div>);
};
