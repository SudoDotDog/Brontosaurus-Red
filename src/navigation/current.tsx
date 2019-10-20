/**
 * @author WMXPY
 * @namespace Navigation
 * @description Current
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SubButton } from "./sub-button";

export const CurrentMenu: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    return (<React.Fragment>

        <SubButton
            selected={props.location.pathname === '/current'}
            onClick={() => props.history.push('/current')}
        >
            My Organization
        </SubButton>
        {/* <SubButton
            selected={props.location.pathname.indexOf('/current/register') === 0}
            onClick={() => props.history.push('/current/register')}
        >
            Register Sub Account
        </SubButton> */}
    </React.Fragment>);
};
