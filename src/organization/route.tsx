/**
 * @author WMXPY
 * @namespace Organization
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { CreateOrganization } from "./create";
import { OrganizationEdit } from "./edit";
import { InplodeOrganization } from "./inplode";
import { Organization } from "./organization";

export const OrganizationRoute: React.FC = () => {

    return (
        <Route path="/organization">
            <React.Fragment>
                <Route path="/organization/list" component={Organization} />
                <Route path="/organization/create" component={CreateOrganization} />
                <Route path="/organization/inplode" component={InplodeOrganization} />
                <Route path="/organization/e/:organization" component={OrganizationEdit} />
            </React.Fragment>
        </Route>
    );
};
