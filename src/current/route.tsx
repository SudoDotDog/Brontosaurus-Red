/**
 * @author WMXPY
 * @namespace Current
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { CurrentRegister } from "./register";

export const CurrentRoute: React.FC = () => {

    return (
        <Route path="/current" component={CurrentRegister} />
    );
};
