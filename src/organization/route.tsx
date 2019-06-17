/**
 * @author WMXPY
 * @namespace Organization
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { CreateOrganization } from "./create";
import { InplodeOrganization } from "./inplode";
import { Organization } from "./organization";

export const OrganizationRoute: React.FC = () => {

    return (
        <Route path="/organization">
            <React.Fragment>
                <Route path="/organization/list" component={Organization} />
                <Route path="/organization/create" component={CreateOrganization} />
                <Route path="/organization/inplode" component={InplodeOrganization} />
            </React.Fragment>
        </Route>
    );
};
