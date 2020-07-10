/**
 * @author WMXPY
 * @namespace Account
 * @description Navigation
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SubButton } from "../navigation/sub-button";

export const AccountNavigation: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    return (<React.Fragment>

        <SubButton
            selected={props.location.pathname.includes('/admin/account')}
            onClick={() => props.history.push('/admin/account/list')}
        >
            Account
        </SubButton>
        <SubButton
            selected={props.location.pathname.includes('/admin/organization')}
            onClick={() => props.history.push('/admin/organization/list')}
        >
            Organization
        </SubButton>
    </React.Fragment>);
};
