/**
 * @author WMXPY
 * @namespace Components
 * @description Search Double New
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonApplicable } from "@sudoo/neon/input";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import SearchNewStyle from "../../style/components/search-new.scss";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";

export type SearchDoubleNewProps = {

    readonly label: string;
    readonly onSearch: (keyword: string) => any;
    readonly onNew: () => any;
    readonly onInplode: () => any;
    readonly defaultValue?: string;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

type ConnectedProps = SearchDoubleNewProps & ConnectedStates;

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export const SearchDoubleNewBase: React.ComponentType<ConnectedProps> = (props: ConnectedProps) => {

    return (<div className={SearchNewStyle["search-bar"]}>
        <NeonApplicable
            defaultValue={props.defaultValue}
            className={SearchNewStyle.search}
            size={SIZE.MEDIUM}
            apply={props.language.get(PROFILE.APPLY)}
            label={`${props.language.get(PROFILE.SEARCH)} ${props.label}`}
            onApply={props.onSearch}
        />

        <div style={{ width: '0.5rem' }}></div>

        <NeonButton
            className={SearchNewStyle.single}
            size={SIZE.RELATIVE}
            onClick={props.onNew}
        >{props.language.get(PROFILE.CREATE_NEW)}</NeonButton>

        <NeonButton
            className={SearchNewStyle.single}
            size={SIZE.RELATIVE}
            onClick={props.onInplode}
        >{props.language.get(PROFILE.INPLODE)}</NeonButton>
    </div>);
};

export const SearchDoubleNew: React.ComponentType<SearchDoubleNewProps> = connector.connect(SearchDoubleNewBase);

