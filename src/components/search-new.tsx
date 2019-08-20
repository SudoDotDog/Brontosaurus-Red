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
import * as __Search_New from "../../style/components/search-new.scss";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";

export type SearchNewProps = {

    label: string;
    onSearch: (keyword: string) => any;
    onNew: () => any;
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

    return (<div className={__Search_New.searchBar}>
        <NeonApplicable
            className={__Search_New.search}
            size={SIZE.MEDIUM}
            apply={props.language.get(PROFILE.APPLY)}
            label={`${props.language.get(PROFILE.SEARCH)} ${props.label}`}
            onApply={props.onSearch}
        />

        <div style={{ width: '0.5rem' }}></div>

        <NeonButton
            className={__Search_New.single}
            size={SIZE.RELATIVE}
            onClick={props.onNew}
        >{props.language.get(PROFILE.CREATE_NEW)}</NeonButton>
    </div>);
};

export const SearchNew: React.ComponentType<SearchNewProps> = connector.connect(SearchNewBase);
