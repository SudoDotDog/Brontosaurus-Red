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
        <Route path="/admin/user">
            <React.Fragment>
                <Route path="/admin/user/list" component={User} />
                <Route path="/admin/user/new" component={Register} />
                <Route path="/admin/user/e/:username" component={AccountEdit} />
                <Route path="/admin/user/more/:username" component={AccountMore} />
                <Route path="/admin/user/o/:username" component={AccountOrganizationAssign} />
            </React.Fragment>
        </Route>
    );
};
