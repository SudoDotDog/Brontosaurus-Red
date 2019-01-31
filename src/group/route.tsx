/**
 * @author WMXPY
 * @namespace Group
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { CreateGroup } from "./create";
import { Group } from "./group";

export const GroupRoute: React.FC = () => {

    return (
        <Route path="/group">
            <React.Fragment>
                <Route path="/group/list" component={Group} />
                <Route path="/group/create" component={CreateGroup} />
            </React.Fragment>
        </Route>
    );
};
