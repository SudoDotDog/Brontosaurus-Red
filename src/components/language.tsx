/**
 * @author WMXPY
 * @namespace Components
 * @description Language
 */

import { LOCALE } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { IStore } from "../state/declare";
import { setLanguage } from "../state/preference/preference";

type ConnectedLanguageStates = {

    readonly language: LOCALE;
};

type ConnectedLanguageActions = {

    readonly setLanguage: (language: LOCALE) => void;
};

type LanguageProps = {

    readonly className?: string;
};

type ConnectedProps = LanguageProps & ConnectedLanguageStates & ConnectedLanguageActions;

const connector = Connector.create<IStore, ConnectedLanguageStates, ConnectedLanguageActions>()
    .connectStates(({ preference }: IStore) => ({

        language: preference.language,
    })).connectActions({

        setLanguage,
    });

export const LanguageBase: React.FC<ConnectedProps> = (props: ConnectedProps) => {

    return (
        <select
            value={props.language}
            onChange={(next: React.ChangeEvent<HTMLSelectElement>) => props.setLanguage(next.target.value as LOCALE)}
            className={props.className}
        >
            <option value={LOCALE.CHINESE_SIMPLIFIED}>简体中文</option>
            <option value={LOCALE.ENGLISH_UNITED_STATES}>English</option>
        </select>
    );
};

export const ConnectedLanguage: React.ComponentType<LanguageProps> = connector.connect(LanguageBase);