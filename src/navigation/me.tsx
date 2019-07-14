/**
 * @author WMXPY
 * @namespace Navigation
 * @description Me
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SubButton } from "./sub-button";

export const MeMenu: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    return (<React.Fragment>

        <SubButton
            selected={props.location.pathname.indexOf('/me/change-password') === 0}
            onClick={() => props.history.push('/me/change-password')}
        >
            Change Password
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/me/2fa') === 0}
            onClick={() => props.history.push('/me/2fa')}
        >
            Two-Factor Authorization
        </SubButton>
    </React.Fragment>);
};
