/**
 * @author WMXPY
 * @namespace Preference
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { PreferenceMenu } from "./menu";
import { NamesPreference } from "./names";

export const PreferenceRoute: React.FC = () => {

    return (<Route path="/preference">
        <React.Fragment>
            <Route path="/preference/menu" component={PreferenceMenu} />
            <Route path="/preference/names" component={NamesPreference} />
        </React.Fragment>
    </Route>);
};
