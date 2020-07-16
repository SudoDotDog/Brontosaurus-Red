/**
 * @author WMXPY
 * @namespace Navigation
 * @description Index Navigation
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

export type IndexNavProps = RouteComponentProps & ConnectedStates;

export const IndexNavBase: React.FC<IndexNavProps> = (props: IndexNavProps) => {

    return (<React.Fragment>
        <SubButton
            selected={props.location.pathname === '/'}
            onClick={() => props.history.push('/')}
        >
            {props.language.get(PROFILE.HOME)}
        </SubButton>
    </React.Fragment>);
};

export const IndexNav: React.ComponentType = connector.connect(IndexNavBase);
