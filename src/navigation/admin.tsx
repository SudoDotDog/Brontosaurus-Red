/**
 * @author WMXPY
 * @namespace Page
 * @description Admin
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SubButton } from "./sub-button";

export const AdminMenu: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    return (<React.Fragment>

        <SubButton
            selected={props.location.pathname.includes('/admin/user')}
            onClick={() => props.history.push('/admin/user/list')}
        >
            Account
        </SubButton>
        <SubButton
            selected={props.location.pathname.includes('/admin/organization')}
            onClick={() => props.history.push('/admin/organization/list')}
        >
            Organization
        </SubButton>
        <SubButton
            selected={props.location.pathname.includes('/admin/group')}
            onClick={() => props.history.push('/admin/group/list')}
        >
            Group
        </SubButton>
        <SubButton
            selected={props.location.pathname.includes('/admin/decorator')}
            onClick={() => props.history.push('/admin/decorator/list')}
        >
            Decorator
        </SubButton>
        <SubButton
            selected={props.location.pathname.includes('/admin/tag')}
            onClick={() => props.history.push('/admin/tag/list')}
        >
            Tag
        </SubButton>
        <SubButton
            selected={props.location.pathname.includes('/admin/application')}
            onClick={() => props.history.push('/admin/application/list')}
        >
            Application
        </SubButton>
        <SubButton
            selected={props.location.pathname.includes('/admin/preference')}
            onClick={() => props.history.push('/admin/preference/menu')}
        >
            Preference
        </SubButton>
    </React.Fragment>);
};
