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

    return (<React.Fragment>
        <Route path="/admin/user" exact component={User} />
        <Route path="/admin/user/new" exact component={Register} />
        <Route path="/admin/user/e/:username" exact component={AccountEdit} />
        <Route path="/admin/user/more/:username" exact component={AccountMore} />
        <Route path="/admin/user/o/:username" exact component={AccountOrganizationAssign} />
    </React.Fragment>);
};
