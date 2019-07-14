/**
 * @author WMXPY
 * @namespace Me
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { MeChangePassword } from "./change-password";
import { MeMenu } from "./menu";
import { MeEnable2FA } from "./twoFA";

export const MeRoute: React.FC = () => {

    return (<React.Fragment>
        <Route path="/me" exact component={MeMenu} />
        <Route path="/me/change-password" component={MeChangePassword} />
        <Route path="/me/2fa" component={MeEnable2FA} />
    </React.Fragment>);
};
