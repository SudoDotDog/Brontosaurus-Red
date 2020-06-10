/**
 * @author WMXPY
 * @namespace Navigation
 * @description Me
 */

import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { SubButton } from "./sub-button";

type MeMenuStates = {

    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, MeMenuStates>()
    .connectStates(({ preference }: IStore) => ({

        language: intl.format(preference.language),
    }));

type MeMenuProps = MeMenuStates & RouteComponentProps;

export const MeMenuBase: React.FC<MeMenuProps> = (props: MeMenuProps) => {

    return (<React.Fragment>

        <SubButton
            selected={props.location.pathname === '/me'}
            onClick={() => props.history.push('/me')}
        >
            {props.language.get(PROFILE.MY_ACCOUNT)}
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/me/change-password') === 0}
            onClick={() => props.history.push('/me/change-password')}
        >
            {props.language.get(PROFILE.CHANGE_PASSWORD)}
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/me/2fa') === 0}
            onClick={() => props.history.push('/me/2fa')}
        >
            {props.language.get(PROFILE.TWO_FACTOR_AUTHORIZATION)}
        </SubButton>
    </React.Fragment>);
};

export const MeMenu: React.ComponentType<unknown> = connector.connect(MeMenuBase);
