/**
 * @author WMXPY
 * @namespace Tag
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { CreateTag } from "./create";
import { TagEdit } from "./edit";
import { Tags } from "./tag";

export const TagRoute: React.FC = () => {

    return (<React.Fragment>
        <Route path="/admin/tag" exact component={Tags} />
        <Route path="/admin/tag/create" exact component={CreateTag} />
        <Route path="/admin/tag/e/:tag" exact component={TagEdit} />
    </React.Fragment>);
};
