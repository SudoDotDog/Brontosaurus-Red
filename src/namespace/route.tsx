/**
 * @author WMXPY
 * @namespace Namespace
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { CreateNamespace } from "./create";
import { NamespaceEdit } from "./edit";
import { NamespaceMembers } from "./members";
import { NamespaceMore } from "./more";
import { Namespace } from "./namespace";

export const NamespaceRoute: React.FC = () => {

    return (<React.Fragment>
        <Route path="/admin/namespace" exact component={Namespace} />
        <Route path="/admin/namespace/create" exact component={CreateNamespace} />
        <Route path="/admin/namespace/e/:namespace" exact component={NamespaceEdit} />
        <Route path="/admin/namespace/more/:namespace" exact component={NamespaceMore} />
        <Route path="/admin/namespace/members/:namespace" exact component={NamespaceMembers} />
    </React.Fragment>);
};
