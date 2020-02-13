/**
 * @author WMXPY
 * @namespace Preference
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { GlobalPreference } from "./global";
import { MailerTransportPreference } from "./mailer-transport";
import { PreferenceMenu } from "./menu";
import { NamesPreference } from "./names";

export const PreferenceRoute: React.FC = () => {

    return (<React.Fragment>
        <Route path="/admin/preference" exact component={PreferenceMenu} />
        <Route path="/admin/preference/names" exact component={NamesPreference} />
        <Route path="/admin/preference/global" exact component={GlobalPreference} />
        <Route path="/admin/preference/mailer-transport" exact component={MailerTransportPreference} />
    </React.Fragment>);
};
