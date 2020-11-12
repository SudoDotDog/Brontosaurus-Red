/**
 * @author WMXPY
 * @namespace Component
 * @description Active Status
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonSub } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import ActiveStatusStyle from "../../style/components/active-status.scss";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { combineClasses } from "../util/style";

export type ActiveStatusBaseProps = {

    readonly active: boolean;

    readonly children?: any;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type ActiveStatusProps = ActiveStatusBaseProps & ConnectedStates;

export const ActiveStatusBase: React.FC<ActiveStatusProps> = (props: ActiveStatusProps) => {

    const text: string = props.active
        ? props.language.get(PROFILE.ACTIVE)
        : props.language.get(PROFILE.INACTIVE);

    return (<NeonSub>
        <span className={combineClasses(
            ActiveStatusStyle["active-status"],
            props.active ? ActiveStatusStyle.activated : ActiveStatusStyle.inactivated,
        )}>
            {text}
        </span>
        {props.children}
    </NeonSub>);
};

export const ActiveStatus: React.ComponentType<ActiveStatusBaseProps> = connector.connect(ActiveStatusBase);
