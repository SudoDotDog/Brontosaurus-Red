/**
 * @author WMXPY
 * @namespace Group
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { CreateGroup } from "./create";
import { GroupEdit } from "./edit";
import { Group } from "./group";

export const GroupRoute: React.FC = () => {

    return (
        <Route path="/admin/group">
            <React.Fragment>
                <Route path="/admin/group/list" component={Group} />
                <Route path="/admin/group/create" component={CreateGroup} />
                <Route path="/admin/group/e/:group" component={GroupEdit} />
            </React.Fragment>
        </Route>
    );
};
