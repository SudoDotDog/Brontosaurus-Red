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

    return (<React.Fragment>
        <Route path="/admin/application" exact component={Application} />
        <Route path="/admin/application/create" exact component={CreateApplication} />
        <Route path="/admin/application/e/:application" exact component={ApplicationEdit} />
    </React.Fragment>);
};
