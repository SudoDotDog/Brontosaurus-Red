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
        <Route path="/admin/account" exact component={User} />
        <Route path="/admin/account/new" exact component={Register} />
        <Route path="/admin/account/e/:namespace/:username" exact component={AccountEdit} />
        <Route path="/admin/account/more/:namespace/:username" exact component={AccountMore} />
        <Route path="/admin/account/attempts/:namespace/:username" exact component={AccountAttempts} />
        <Route path="/admin/account/resets/:namespace/:username" exact component={AccountResets} />
        <Route path="/admin/account/o/:namespace/:username" exact component={AccountOrganizationAssign} />
    </React.Fragment>);
};
