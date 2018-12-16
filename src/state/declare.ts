/**
 * @author WMXPY
 * @namespace Portal_State
 * @description Declare
 */

import { IFormStore } from "./form/type";

export interface IStore {

    readonly form: IFormStore;
}

export enum ACTIONS {

    // form
    SET_USERNAME_AND_PASSWORD = 'SET_USERNAME_AND_PASSWORD',
}
