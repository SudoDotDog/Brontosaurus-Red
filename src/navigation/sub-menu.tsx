/**
 * @author WMXPY
 * @namespace Navigation
 * @description Sub Menu
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { AdminMenu } from "./admin";

export const SubMenuRoute: React.FC = () => {

    return (
        <React.Fragment>
            <Route path="/admin" component={AdminMenu} />
        </React.Fragment>
    );
};
