/**
 * @author WMXPY
 * @namespace Organization
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { OrganizationAddAccount } from "./add-account";
import { CreateOrganization } from "./create";
import { OrganizationEdit } from "./edit";
import { InplodeOrganization } from "./inplode";
import { OrganizationMore } from "./more";
import { Organization } from "./organization";

export const OrganizationRoute: React.FC = () => {

    return (
        <Route path="/admin/organization">
            <React.Fragment>
                <Route path="/admin/organization/list" component={Organization} />
                <Route path="/admin/organization/create" component={CreateOrganization} />
                <Route path="/admin/organization/inplode" component={InplodeOrganization} />
                <Route path="/admin/organization/e/:organization" component={OrganizationEdit} />
                <Route path="/admin/organization/more/:organization" component={OrganizationMore} />
                <Route path="/admin/organization/a/:organization" component={OrganizationAddAccount} />
            </React.Fragment>
        </Route>
    );
};
