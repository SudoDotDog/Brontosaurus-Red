/**
 * @author WMXPY
 * @namespace Page
 * @description Register
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Web } from "../sudoo/web";

type RegisterProp = {
} & RouteComponentProps;


export const Register: React.SFC<RegisterProp> = (props: RegisterProp) => {

    return (<div>
        <button onClick={() => Web.info()}>Login</button>
        Register
    </div>);
};
