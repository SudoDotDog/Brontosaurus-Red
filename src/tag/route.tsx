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
        <Route path="/tag">
            <React.Fragment>
                <Route path="/tag/list" component={Tags} />
                <Route path="/tag/create" component={CreateTag} />
                <Route path="/tag/e/:tag" component={TagEdit} />
            </React.Fragment>
        </Route>
    );
};
