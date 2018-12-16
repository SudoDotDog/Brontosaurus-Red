/**
 * @author WMXPY
 * @namespace Portal
 * @description Hello
 */

import * as React from "react";
import { connect, ConnectedComponentClass } from "react-redux";
import { IStore } from "../state/declare";
import { setFormUser } from "../state/form/form";

type LoginProp = {

    username: string;
    password: string;

    setFormUser: (username: string, password: string) => void;
};

const mapStates = ({ form }: IStore): Partial<LoginProp> => ({

    username: form.username,
    password: form.password,
});

const mapDispatches: Partial<LoginProp> = {

    setFormUser,
};

export const LoginBase: React.SFC<LoginProp> = (props: LoginProp) => {

    console.log(props);

    return (<div>{props.password}
        <button onClick={() => props.setFormUser('1', '2')} />
    </div>);
};

export const ConnectedLogin: ConnectedComponentClass<typeof LoginBase, any> = connect(mapStates, mapDispatches as any)(LoginBase);
