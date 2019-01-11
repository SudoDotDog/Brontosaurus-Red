/**
 * @author WMXPY
 * @namespace Page
 * @description Nav
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

type NavProp = {
} & RouteComponentProps;

export const Nav: React.SFC<NavProp> = (props: NavProp) => {

    console.log(props);

    return (<React.Fragment>
        <NeonButton
            size={SIZE.MEDIUM}
            onClick={() => props.history.push('/register')}
        >
            Register
        </NeonButton>
        <NeonButton
            size={SIZE.MEDIUM}
            onClick={() => props.history.push('/edit')}
        >
            Edit
        </NeonButton>
    </React.Fragment>);
};
