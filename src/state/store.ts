/**
 * @author WMXPY
 * @namespace Portal_State
 * @description Store
 */

import { Store, SudooRedux } from '@sudoo/redux';
import { ACTIONS, IStore } from './declare';
import { formReducers, getDefaultFormStore } from './form/form';

export const PortalStore: IStore = {

    form: getDefaultFormStore(),
};

export const getStore = (): Store<IStore> =>
    SudooRedux.create<IStore, ACTIONS>(PortalStore)
        .reducers(formReducers)
        .createStore();
