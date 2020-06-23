/**
 * @author WMXPY
 * @namespace Account
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { AccountOrganizationAssign } from "./assign";
import { AccountAttempts } from "./attempts";
import { AccountEdit } from "./edit";
import { AccountMore } from "./more";
import { Register } from "./register";
import { AccountResets } from "./resets";
import { User } from "./user";

export const UserRoute: React.FC = () => {

    return (<React.Fragment>
        <Route path="/admin/user" exact component={User} />
        <Route path="/admin/user/new" exact component={Register} />
        <Route path="/admin/user/e/:namespace/:username" exact component={AccountEdit} />
        <Route path="/admin/user/more/:namespace/:username" exact component={AccountMore} />
        <Route path="/admin/user/attempts/:namespace/:username" exact component={AccountAttempts} />
        <Route path="/admin/user/resets/:namespace/:username" exact component={AccountResets} />
        <Route path="/admin/user/o/:namespace/:username" exact component={AccountOrganizationAssign} />
    </React.Fragment>);
};
