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

    return (
        <Route path="/admin/decorator">
            <React.Fragment>
                <Route path="/admin/decorator/list" component={Decorator} />
                <Route path="/admin/decorator/create" component={CreateDecorator} />
                <Route path="/admin/decorator/e/:decorator" component={DecoratorEdit} />
            </React.Fragment>
        </Route>
    );
};
