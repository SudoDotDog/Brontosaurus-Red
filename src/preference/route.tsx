/**
 * @author WMXPY
 * @namespace Preference
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { GlobalPreference } from "./global";
import { PreferenceMenu } from "./menu";
import { NamesPreference } from "./names";

export const PreferenceRoute: React.FC = () => {

    return (<Route path="/admin/preference">
        <React.Fragment>
            <Route path="/admin/preference/menu" component={PreferenceMenu} />
            <Route path="/admin/preference/names" component={NamesPreference} />
            <Route path="/admin/preference/global" component={GlobalPreference} />
        </React.Fragment>
    </Route>);
};
