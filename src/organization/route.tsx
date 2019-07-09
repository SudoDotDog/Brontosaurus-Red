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
        <Route path="/organization">
            <React.Fragment>
                <Route path="/organization/list" component={Organization} />
                <Route path="/organization/create" component={CreateOrganization} />
                <Route path="/organization/inplode" component={InplodeOrganization} />
                <Route path="/organization/e/:organization" component={OrganizationEdit} />
                <Route path="/organization/more/:organization" component={OrganizationMore} />
                <Route path="/organization/a/:organization" component={OrganizationAddAccount} />
            </React.Fragment>
        </Route>
    );
};
