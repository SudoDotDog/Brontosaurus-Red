/**
 * @author WMXPY
 * @namespace Decorator
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { CreateDecorator } from "./create";
import { Decorator } from "./decorator";
import { DecoratorEdit } from "./edit";
import { DecoratorMembers } from "./members";
import { DecoratorMore } from "./more";

export const DecoratorRoute: React.FC = () => {

    return (<React.Fragment>
        <Route path="/admin/decorator" exact component={Decorator} />
        <Route path="/admin/decorator/create" exact component={CreateDecorator} />
        <Route path="/admin/decorator/e/:decorator" exact component={DecoratorEdit} />
        <Route path="/admin/decorator/more/:decorator" exact component={DecoratorMore} />
        <Route path="/admin/decorator/members/:decorator" exact component={DecoratorMembers} />
    </React.Fragment>);
};
