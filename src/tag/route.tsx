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

    return (
        <Route path="/admin/tag">
            <React.Fragment>
                <Route path="/admin/tag/list" component={Tags} />
                <Route path="/admin/tag/create" component={CreateTag} />
                <Route path="/admin/tag/e/:tag" component={TagEdit} />
            </React.Fragment>
        </Route>
    );
};
