/**
 * @author WMXPY
 * @namespace Components
 * @description Search New
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonApplicable } from "@sudoo/neon/input";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import * as SearchNewStyle from "../../style/components/search-new.scss";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";

export type SearchNewProps = {

    readonly label: string;
    readonly onSearch: (keyword: string) => any;
    readonly onNew: () => any;
    readonly defaultValue?: string;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

type ConnectedProps = SearchNewProps & ConnectedStates;

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export const SearchNewBase: React.ComponentType<ConnectedProps> = (props: ConnectedProps) => {

    return (<div className={SearchNewStyle.searchBar}>
        <NeonApplicable
            className={SearchNewStyle.search}
            size={SIZE.MEDIUM}
            apply={props.language.get(PROFILE.APPLY)}
            label={`${props.language.get(PROFILE.SEARCH)} ${props.label}`}
            defaultValue={props.defaultValue}
            onApply={props.onSearch}
        />

        <div style={{ width: '0.5rem' }}></div>

        <NeonButton
            className={SearchNewStyle.single}
            size={SIZE.RELATIVE}
            onClick={props.onNew}
        >{props.language.get(PROFILE.CREATE_NEW)}</NeonButton>
    </div>);
};

export const SearchNew: React.ComponentType<SearchNewProps> = connector.connect(SearchNewBase);
