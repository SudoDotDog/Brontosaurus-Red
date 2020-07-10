/**
 * @author WMXPY
 * @namespace Navigation
 * @description Admin Navigation
 */

import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { SubButton } from "./sub-button";

type ConnectedAdminNavStates = {

    readonly language: SudooFormat;
};

type AdminNavProps = RouteComponentProps & ConnectedAdminNavStates;

const connector = Connector.create<IStore, ConnectedAdminNavStates>()
    .connectStates(({ preference }: IStore) => ({

        language: intl.format(preference.language),
    }));

export const AdminNavBase: React.FC<AdminNavProps> = (props: AdminNavProps) => {

    return (<React.Fragment>

        <SubButton
            selected={props.location.pathname === '/admin'}
            onClick={() => props.history.push('/admin')}
        >
            {props.language.get(PROFILE.ADMIN_PANEL)}
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/account') === 0}
            onClick={() => props.history.push('/admin/account')}
        >
            {props.language.get(PROFILE.ACCOUNT)}
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/organization') === 0}
            onClick={() => props.history.push('/admin/organization')}
        >
            {props.language.get(PROFILE.ORGANIZATION)}
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/group') === 0}
            onClick={() => props.history.push('/admin/group')}
        >
            {props.language.get(PROFILE.GROUP)}
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/decorator') === 0}
            onClick={() => props.history.push('/admin/decorator')}
        >
            {props.language.get(PROFILE.DECORATOR)}
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/namespace') === 0}
            onClick={() => props.history.push('/admin/namespace')}
        >
            {props.language.get(PROFILE.NAMESPACE)}
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/tag') === 0}
            onClick={() => props.history.push('/admin/tag')}
        >
            {props.language.get(PROFILE.TAG)}
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/application') === 0}
            onClick={() => props.history.push('/admin/application')}
        >
            {props.language.get(PROFILE.APPLICATION)}
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/preference') === 0}
            onClick={() => props.history.push('/admin/preference')}
        >
            {props.language.get(PROFILE.PREFERENCE)}
        </SubButton>
    </React.Fragment>);
};

export const AdminNav: React.ComponentType<unknown> = connector.connect(AdminNavBase);
