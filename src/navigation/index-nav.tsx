/**
 * @author WMXPY
 * @namespace Navigation
 * @description Index Navigation
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SubButton } from "./sub-button";

export const IndexNav: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    return (<React.Fragment>

        <SubButton
            selected={props.location.pathname === '/'}
            onClick={() => props.history.push('/')}
        >
            Home
        </SubButton>
    </React.Fragment>);
};
