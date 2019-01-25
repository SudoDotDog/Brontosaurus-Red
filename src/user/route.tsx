/**
 * @author WMXPY
 * @namespace User
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { UserEdit } from "./edit";
import { Register } from "./register";
import { User } from "./user";

export const UserRoute: React.SFC = () => {

    return (
        <Route path="/user">
            <React.Fragment>
                <Route path="/user/list" component={User} />
                <Route path="/user/new" component={Register} />
                <Route path="/user/e/:username" component={UserEdit} />
            </React.Fragment>
        </Route>
    );
};
