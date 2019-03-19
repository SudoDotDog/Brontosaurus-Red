/**
 * @author WMXPY
 * @namespace Red_State
 * @description Store
 */

import { Redux } from '@sudoo/redux';
import { ACTIONS, IStore } from './declare';

export const PortalStore: IStore = {
};

export const redux: Redux<IStore, ACTIONS> =
    Redux.create<IStore, ACTIONS>(PortalStore);
