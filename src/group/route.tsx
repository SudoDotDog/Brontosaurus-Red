/**
 * @author WMXPY
 * @namespace Group
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { Group } from "./group";

export const GroupRoute: React.FC = () => {

    return (
        <Route path="/group" component={Group} />
    );
};
