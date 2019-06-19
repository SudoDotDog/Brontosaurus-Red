/**
 * @author WMXPY
 * @namespace Application
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { Application } from "./application";
import { CreateApplication } from "./create";
import { ApplicationEdit } from "./edit";

export const ApplicationRoute: React.FC = () => {

    return (
        <Route path="/application">
            <React.Fragment>
                <Route path="/application/list" component={Application} />
                <Route path="/application/create" component={CreateApplication} />
                <Route path="/application/e/:application" component={ApplicationEdit} />
            </React.Fragment>
        </Route>
    );
};
