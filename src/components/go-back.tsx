/**
 * @author WMXPY
 * @namespace Component
 * @description Go Back
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonSub } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import * as MenuStyle from "../../style/components/menu.scss";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { combineClasses } from "../util/style";

export type GoBackBaseProps = {

    readonly className?: string;
    readonly right?: string;
    readonly onClickRight?: () => void;

    readonly children?: any;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type GoBackProps = GoBackBaseProps & RouteComponentProps & ConnectedStates;

const GoBackBase: React.FC<GoBackProps> = (props: GoBackProps) => {

    return (<div
        className={combineClasses(
            props.className,
            MenuStyle.goBack,
        )}
    >
        <NeonSub
            onClick={() => props.history.goBack()}
        >{props.language.get(PROFILE.GO_BACK)}</NeonSub>
        {props.right &&
            <NeonSub
                onClick={props.onClickRight}
            >
                {props.right}
            </NeonSub>}
    </div>);
};

export const GoBack: React.ComponentType<GoBackBaseProps> = connector.connect(withRouter(GoBackBase));
