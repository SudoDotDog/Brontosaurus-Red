/**
 * @author WMXPY
 * @namespace Current
 * @description Menu
 */

import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import StyleMe from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { TitleManager } from "../util/title";

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type CurrentMenuProps = RouteComponentProps & ConnectedStates;

export const CurrentMenuBase: React.FC<CurrentMenuProps> = (props: CurrentMenuProps) => {

    React.useEffect(() => {

        TitleManager.setSubPage(PROFILE.MY_ORGANIZATION);
        return () => TitleManager.restoreVoid();
    }, []);

    return (<div className={StyleMe["menu-grid"]}>
        <MenuItem
            description={props.language.get(PROFILE.REGISTER_DESCRIPTION)}
            link={props.language.get(PROFILE.REGISTER)}
            onClick={() => props.history.push('/current/register')}
        />
    </div>);
};

export const CurrentMenu: React.ComponentType = connector.connect(CurrentMenuBase);
