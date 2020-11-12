/**
 * @author WMXPY
 * @namespace Components
 * @description Language
 */

import { LOCALE } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import EntryStyle from "../../style/route/entry.scss";
import { IStore } from "../state/declare";
import { setLanguage } from "../state/preference/preference";
import { combineClasses } from "../util/style";
import { getVersion } from "../util/version";

type ConnectedLanguageStates = {

    readonly language: LOCALE;
};

type ConnectedLanguageActions = {

    readonly setLanguage: (language: LOCALE) => void;
};

type LanguageProps = {
};

type ConnectedProps = LanguageProps & ConnectedLanguageStates & ConnectedLanguageActions;

const connector = Connector.create<IStore, ConnectedLanguageStates, ConnectedLanguageActions>()
    .connectStates(({ preference }: IStore) => ({

        language: preference.language,
    })).connectActions({

        setLanguage,
    });

export const LanguageBase: React.FC<ConnectedProps> = (props: ConnectedProps) => {

    return (<div className={combineClasses(
        EntryStyle["language-bar"],
    )}>
        <div style={{ flex: 1 }}>
            {getVersion()}
        </div>
        <select
            value={props.language}
            className={EntryStyle["language-setting"]}
            onChange={(next: React.ChangeEvent<HTMLSelectElement>) => props.setLanguage(next.target.value as LOCALE)}
        >
            <option value={LOCALE.CHINESE_SIMPLIFIED}>简体中文</option>
            <option value={LOCALE.ENGLISH_UNITED_STATES}>English</option>
        </select>
    </div>);
};

export const ConnectedLanguage: React.ComponentType<LanguageProps> = connector.connect(LanguageBase);
