/**
 * @author WMXPY
 * @namespace Red_State
 * @description Declare
 */

import { PreferenceStore } from "./preference/type";

export interface IStore {

    preference: PreferenceStore;
}

export enum ACTIONS {

    // preference
    SET_LANGUAGE = 'SET_LANGUAGE',
}
