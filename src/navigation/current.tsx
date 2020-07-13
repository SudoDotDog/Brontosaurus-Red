/**
 * @author WMXPY
 * @namespace Navigation
 * @description Current
 */

import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { SubButton } from "./sub-button";

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type CurrentMenuProps = RouteComponentProps & ConnectedStates;

export const CurrentMenuBase: React.FC<CurrentMenuProps> = (props: CurrentMenuProps) => {

    return (<React.Fragment>

        <SubButton
            selected={props.location.pathname === '/current'}
            onClick={() => props.history.push('/current')}
        >
            {props.language.get(PROFILE.MY_ORGANIZATION)}
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/current/register') === 0}
            onClick={() => props.history.push('/current/register')}
        >
            {props.language.get(PROFILE.REGISTER_SUB_ACCOUNT)}
        </SubButton>
    </React.Fragment>);
};

export const CurrentMenu: React.ComponentType = connector.connect(CurrentMenuBase);
