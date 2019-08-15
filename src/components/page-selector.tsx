/**
 * @author WMXPY
 * @namespace Component
 * @description Page Selector
 */

import { NeonCoin } from "@sudoo/neon/button";
import * as React from "react";
import * as PageSelectorStyle from "../../style/components/page-selector.scss";
import { combineClasses } from "../util/style";

export type PageSelectorProps = {

    readonly total: number;
    readonly selected: number;
    readonly onClick: (page: number) => void;
};

export const PageSelector: React.FC<PageSelectorProps> = (props: PageSelectorProps) => {

    if (props.total === 0) {
        return null;
    }

    const list: number[] = [...new Array(props.total)];
    return <div className={PageSelectorStyle.container}>
        {list.map((_, index: number) => {

            return (<NeonCoin
                buttonClassName={combineClasses(
                    PageSelectorStyle.coin,
                    props.selected === index ? PageSelectorStyle.coinSelected : null,
                )}
                key={index}
                onClick={() => {
                    if (props.selected !== index) {
                        props.onClick(index);
                    }
                }}
            >
                {index + 1}
            </NeonCoin>);
        })}
    </div>;
};