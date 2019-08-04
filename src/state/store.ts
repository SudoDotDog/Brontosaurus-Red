/**
 * @author WMXPY
 * @namespace Red_State
 * @description Store
 */

import { Redux } from '@sudoo/redux';
import { ACTIONS, IStore } from './declare';
import { getDefaultPreference } from './preference/preference';

export const RedStore: IStore = {

    preference: getDefaultPreference(),
};

export const redux: Redux<IStore, ACTIONS> =
    Redux.create<IStore, ACTIONS>(RedStore);
