/**
 * @author WMXPY
 * @namespace Preference
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { Preference } from "./preference";

export const PreferenceRoute: React.SFC = () => {

    return (
        <Route path="/preference" component={Preference} />
    );
};
