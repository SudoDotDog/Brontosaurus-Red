/**
 * @author WMXPY
 * @namespace Page
 * @description Nav
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

type NavProp = {
} & RouteComponentProps;

export const Nav: React.SFC<NavProp> = (props: NavProp) => {

    console.log(props);

    return (<div>
        <button onClick={() => props.history.push('/register')}>Register</button>
        <button onClick={() => props.history.push('/edit')}>Edit</button>
    </div>);
};
