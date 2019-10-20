/**
 * @author WMXPY
 * @namespace Current
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { CurrentMenu } from "./menu";
import { CurrentRegister } from "./register";

export const CurrentRoute: React.FC = () => {

    return (
        <React.Fragment>
            <Route path="/current" exact component={CurrentMenu} />
        </React.Fragment>
    );
};
