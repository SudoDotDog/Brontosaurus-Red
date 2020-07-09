/**
 * @author WMXPY
 * @namespace Component
 * @description Lite Status
 */

import * as React from "react";
import * as ActiveStatusStyle from "../../style/components/active-status.scss";
import { combineClasses } from "../util/style";

export type LiteStatusProps = {

    readonly active: boolean;

    readonly activeText: string;
    readonly inactiveText: string;
};

export const LiteStatus: React.FC<LiteStatusProps> = (props: LiteStatusProps) => {

    const text: string = props.active ? props.activeText : props.inactiveText;

    return (<span className={combineClasses(
        ActiveStatusStyle["lite-status"],
        props.active ? ActiveStatusStyle.activated : ActiveStatusStyle.inactivated,
    )}>
        {text}
    </span>);
};
