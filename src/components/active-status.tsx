/**
 * @author WMXPY
 * @namespace Component
 * @description Active Status
 */

import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import * as ActiveStatusStyle from "../../style/components/active-status.scss";
import { combineClasses } from "../util/style";

export type ActiveStatusProps = {

    readonly active: boolean;

    readonly children?: any;
};

export const ActiveStatus: React.FC<ActiveStatusProps> = (props: ActiveStatusProps) => {

    const text: string = props.active ? 'Active' : 'Inactive';
    return (<NeonSub>
        <span className={combineClasses(
            ActiveStatusStyle["active-status"],
            props.active ? ActiveStatusStyle.activated : ActiveStatusStyle.inactivated,
        )}>
            {text}
        </span>
    </NeonSub>);
};
