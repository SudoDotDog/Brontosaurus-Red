/**
 * @author WMXPY
 * @namespace Account
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { AccountOrganizationAssign } from "./assign";
import { AccountEdit } from "./edit";
import { AccountMore } from "./more";
import { Register } from "./register";
import { User } from "./user";

export const UserRoute: React.FC = () => {

    return (
        <Route path="/user">
            <React.Fragment>
                <Route path="/user/list" component={User} />
                <Route path="/user/new" component={Register} />
                <Route path="/user/e/:username" component={AccountEdit} />
                <Route path="/user/more/:username" component={AccountMore} />
                <Route path="/user/o/:username" component={AccountOrganizationAssign} />
            </React.Fragment>
        </Route>
    );
};
