/**
 * @author WMXPY
 * @namespace State_Preference
 * @description Reducer
 */

import { LOCALE } from '@sudoo/internationalization';
import { Reducer } from '@sudoo/redux';
import { ACTIONS, IStore } from '../declare';
import { defaultLanguage, ISetLanguageReducerAction, PreferenceStore } from './type';

const reduceLanguage: Reducer<IStore, ISetLanguageReducerAction> = (state: IStore | undefined, action: ISetLanguageReducerAction): IStore => {

    const newPreference: PreferenceStore = {
        ...(state as IStore).preference,
        language: action.language,
    };

    localStorage.setItem('Brontosaurus_Preference', JSON.stringify(newPreference));
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

    const item: string | null = localStorage.getItem('Brontosaurus_Preference');

    if (!item) {
        return {
            language: defaultLanguage,
        };
    }

    const parsed: any = JSON.parse(item);

    const preference: PreferenceStore = {
        language: parsed.language || defaultLanguage,
    };
    return preference;
};
