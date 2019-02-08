/**
 * @author WMXPY
 * @namespace Me
 * @description Route
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { Me } from "./me";

export const MeRoute: React.FC = () => {

    return (<Route path="/me" component={Me} />);
};
