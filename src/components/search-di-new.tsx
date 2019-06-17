/**
 * @author WMXPY
 * @namespace Components
 * @description Search Double New
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonApplicable } from "@sudoo/neon/input";
import * as React from "react";
import * as __Search_New from "../../style/components/search-new.scss";

export type SearchDoubleNewProps = {

    label: string;
    onSearch: (keyword: string) => any;
    onNew: () => any;
    onInplode: () => any;
};

export const SearchDoubleNew: React.ComponentType<SearchDoubleNewProps> = (props: SearchDoubleNewProps) => {

    return (<div className={__Search_New.searchBar}>

        <NeonApplicable
            className={__Search_New.search}
            size={SIZE.MEDIUM}
            label={`Search ${props.label}`}
            onApply={props.onSearch}
        />

        <div style={{ width: '0.5rem' }}></div>

        <NeonButton
            className={__Search_New.single}
            size={SIZE.RELATIVE}
            onClick={props.onNew}
        >
            New
        </NeonButton>

        <NeonButton
            className={__Search_New.single}
            size={SIZE.RELATIVE}
            onClick={props.onInplode}
        >
            Inplode
        </NeonButton>

    </div>);
};
