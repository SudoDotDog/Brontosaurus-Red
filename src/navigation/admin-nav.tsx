/**
 * @author WMXPY
 * @namespace Navigation
 * @description Admin Navigation
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SubButton } from "./sub-button";

export const AdminNav: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    return (<React.Fragment>

        <SubButton
            selected={props.location.pathname.indexOf('/admin/user') === 0}
            onClick={() => props.history.push('/admin/user')}
        >
            Account
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/organization') === 0}
            onClick={() => props.history.push('/admin/organization')}
        >
            Organization
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/group') === 0}
            onClick={() => props.history.push('/admin/group')}
        >
            Group
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/decorator') === 0}
            onClick={() => props.history.push('/admin/decorator')}
        >
            Decorator
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/tag') === 0}
            onClick={() => props.history.push('/admin/tag')}
        >
            Tag
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/application') === 0}
            onClick={() => props.history.push('/admin/application')}
        >
            Application
        </SubButton>
        <SubButton
            selected={props.location.pathname.indexOf('/admin/preference') === 0}
            onClick={() => props.history.push('/admin/preference')}
        >
            Preference
        </SubButton>
    </React.Fragment>);
};
