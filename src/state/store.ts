/**
 * @author WMXPY
 * @namespace Red_State
 * @description Store
 */

import { SudooRedux } from '@sudoo/redux';
import { ACTIONS, IStore } from './declare';

export const PortalStore: IStore = {
};

export const redux: SudooRedux<IStore, ACTIONS> =
    SudooRedux.create<IStore, ACTIONS>(PortalStore);
