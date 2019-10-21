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
import { GroupMore } from "./more";

export const GroupRoute: React.FC = () => {

    return (<React.Fragment>
        <Route path="/admin/group" exact component={Group} />
        <Route path="/admin/group/create" exact component={CreateGroup} />
        <Route path="/admin/group/e/:group" exact component={GroupEdit} />
        <Route path="/admin/group/more/:group" exact component={GroupMore} />
    </React.Fragment>);
};
