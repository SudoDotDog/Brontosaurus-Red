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
import { OrganizationMembers } from "./members";
import { OrganizationMore } from "./more";
import { Organization } from "./organization";
import { OrganizationSubRegister } from "./register";

export const OrganizationRoute: React.FC = () => {

    return (<React.Fragment>
        <Route path="/admin/organization" exact component={Organization} />
        <Route path="/admin/organization/create" exact component={CreateOrganization} />
        <Route path="/admin/organization/inplode" exact component={InplodeOrganization} />
        <Route path="/admin/organization/e/:organization" exact component={OrganizationEdit} />
        <Route path="/admin/organization/a/:organization" exact component={OrganizationAddAccount} />
        <Route path="/admin/organization/more/:organization" exact component={OrganizationMore} />
        <Route path="/admin/organization/register/:organization" exact component={OrganizationSubRegister} />
        <Route path="/admin/organization/members/:organization" exact component={OrganizationMembers} />
    </React.Fragment>);
};
