/**
 * @author WMXPY
 * @namespace Portal_State
 * @description Store
 */

import { Store, SudooRedux } from '@sudoo/redux';
import { ACTIONS, IStore } from './declare';

export const PortalStore: IStore = {
};

export const getStore = (): Store<IStore> =>
    SudooRedux.create<IStore, ACTIONS>(PortalStore)
        .createStore();
