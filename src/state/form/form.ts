/**
 * @author WMXPY
 * @namespace Portal_State_Form
 * @description Reducer
 */

import { Reducer } from '@sudoo/redux';
import { ACTIONS, IStore } from '../declare';
import { IFormStore, ISetFormUserPassReducerAction } from './type';

const reduceUsernameAndPassword: Reducer<IStore, ISetFormUserPassReducerAction> = (state: IStore | undefined, action: ISetFormUserPassReducerAction): IStore => ({

    ...state as IStore,
    form: {

        username: action.username,
        password: action.password,
    },
});

export const formReducers = {

    [ACTIONS.SET_USERNAME_AND_PASSWORD]: reduceUsernameAndPassword,
};

export const setFormUser = (username: string, password: string): ISetFormUserPassReducerAction => ({

    type: ACTIONS.SET_USERNAME_AND_PASSWORD,
    username,
    password,
});

export const getDefaultFormStore = (): IFormStore => ({

    username: '',
    password: '',
});
