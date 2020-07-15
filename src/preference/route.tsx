/**
 * @author WMXPY
 * @namespace Preference
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { GlobalPreference } from "./global";
import { GlobalBackgroundImagesPreference } from "./global-background-image";
import { MailerSourcePreference } from "./mailer-source";
import { MailerTransportPreference } from "./mailer-transport";
import { PreferenceMenu } from "./menu";
import { NamesPreference } from "./names";

export const PreferenceRoute: React.FC = () => {

    return (<React.Fragment>
        <Route path="/admin/preference" exact component={PreferenceMenu} />
        <Route path="/admin/preference/names" exact component={NamesPreference} />
        <Route path="/admin/preference/global" exact component={GlobalPreference} />
        <Route path="/admin/preference/global-background-images" exact component={GlobalBackgroundImagesPreference} />
        <Route path="/admin/preference/mailer-transport" exact component={MailerTransportPreference} />
        <Route path="/admin/preference/mailer-source" exact component={MailerSourcePreference} />
    </React.Fragment>);
};
