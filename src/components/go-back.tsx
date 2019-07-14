/**
 * @author WMXPY
 * @namespace Component
 * @description Go Back
 */

import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import * as MenuStyle from "../../style/components/menu.scss";
import { combineClasses } from "../util/style";

export type GoBackBaseProps = {

    readonly className?: string;
    readonly right?: string;
    readonly onClickRight?: () => void;

    readonly children?: any;
};

export type GoBackProps = GoBackBaseProps & RouteComponentProps;

const GoBackBase: React.FC<GoBackProps> = (props: GoBackProps) => {

    return (<div
        className={combineClasses(
            props.className,
            MenuStyle.goBack,
        )}
    >
        <NeonSub
            onClick={() => props.history.goBack()}
        >
            Go Back
        </NeonSub>
        {props.right &&
            <NeonSub
                onClick={props.onClickRight}
            >
                {props.right}
            </NeonSub>}
    </div>);
};

export const GoBack: React.ComponentType<GoBackBaseProps> = withRouter(GoBackBase);
