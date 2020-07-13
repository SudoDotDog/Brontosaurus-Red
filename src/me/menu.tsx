/**
 * @author WMXPY
 * @namespace Me
 * @description Menu
 */

import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as StyleMe from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type MeMenuProps = RouteComponentProps & ConnectedStates;

export const MeMenuBase: React.FC<MeMenuProps> = (props: MeMenuProps) => {

    return (<div className={StyleMe["menu-grid"]}>
        <MenuItem
            description={props.language.get(PROFILE.CHANGE_PASSWORD_DESCRIPTION)}
            link={props.language.get(PROFILE.CHANGE_PASSWORD)}
            onClick={() => props.history.push('/me/change-password')}
        />
        <MenuItem
            description={props.language.get(PROFILE.ENABLE_TWO_FA_DESCRIPTION)}
            link={props.language.get(PROFILE.ENABLE_RESET_TWO_FA)}
            onClick={() => props.history.push('/me/2fa')}
        />
    </div>);
};

export const MeMenu: React.ComponentType = connector.connect(MeMenuBase);
