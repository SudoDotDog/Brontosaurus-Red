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

export const DecoratorRoute: React.FC = () => {

    return (<React.Fragment>
        <Route path="/admin/decorator" exact component={Decorator} />
        <Route path="/admin/decorator/create" exact component={CreateDecorator} />
        <Route path="/admin/decorator/e/:decorator" exact component={DecoratorEdit} />
    </React.Fragment>);
};
