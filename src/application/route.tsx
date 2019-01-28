/**
 * @author WMXPY
 * @namespace Application
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { Application } from "./application";

export const ApplicationRoute: React.FC = () => {

    return (
        <Route path="/application" component={Application} />
    );
};
