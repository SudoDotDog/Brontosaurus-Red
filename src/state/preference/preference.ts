/**
 * @author WMXPY
 * @namespace State_Preference
 * @description Reducer
 */

import { getSystemLanguage, LOCALE } from '@sudoo/internationalization';
import { Reducer } from '@sudoo/redux';
import { TitleManager } from '../../util/title';
import { ACTIONS, IStore } from '../declare';
import { defaultLanguage, ISetLanguageReducerAction, PreferenceStore } from './type';

const PREFERENCE_STORAGE_KEY: string = 'Brontosaurus_Preference';

const reduceLanguage: Reducer<IStore, ISetLanguageReducerAction> = (state: IStore | undefined, action: ISetLanguageReducerAction): IStore => {

    const language: LOCALE = action.language;
    const newPreference: PreferenceStore = {
        ...(state as IStore).preference,
        language,
    };

    localStorage.setItem(
        PREFERENCE_STORAGE_KEY,
        JSON.stringify(newPreference),
    );

    TitleManager.setLanguage(language);
    TitleManager.refreshTitle();

    return {
        ...state as IStore,
        preference: newPreference,
    };
};

export const preferenceReducers = {

    [ACTIONS.SET_LANGUAGE]: reduceLanguage,
};

export const setLanguage = (language: LOCALE): ISetLanguageReducerAction => ({

    type: ACTIONS.SET_LANGUAGE,
    language,
});

export const getDefaultPreference = (): PreferenceStore => {

    const item: string | null = localStorage.getItem(
        PREFERENCE_STORAGE_KEY,
    );

    const checkedDefaultLanguage: LOCALE = getSystemLanguage(defaultLanguage);

    if (!item) {
        return {
            language: checkedDefaultLanguage,
        };
    }

    const parsed: any = JSON.parse(item);
    const language: LOCALE = parsed.language ?? checkedDefaultLanguage;

    TitleManager.setLanguage(language);

    const preference: PreferenceStore = {
        language,
    };
    return preference;
};
