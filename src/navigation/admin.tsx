/**
 * @author WMXPY
 * @namespace Page
 * @description Admin
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export const AdminMenu: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    return (<React.Fragment>
        <NeonButton
            size={SIZE.MEDIUM}
            onClick={() => props.history.push('/admin/user/list')}
        >
            Account
        </NeonButton>
        <NeonButton
            size={SIZE.MEDIUM}
            onClick={() => props.history.push('/admin/organization/list')}
        >
            Organization
        </NeonButton>
        <NeonButton
            size={SIZE.MEDIUM}
            onClick={() => props.history.push('/admin/group/list')}
        >
            Group
        </NeonButton>
        <NeonButton
            size={SIZE.MEDIUM}
            onClick={() => props.history.push('/admin/decorator/list')}
        >
            Decorator
        </NeonButton>
        <NeonButton
            size={SIZE.MEDIUM}
            onClick={() => props.history.push('/admin/tag/list')}
        >
            Tag
        </NeonButton>
        <NeonButton
            size={SIZE.MEDIUM}
            onClick={() => props.history.push('/admin/application/list')}
        >
            Application
        </NeonButton>
        <NeonButton
            size={SIZE.MEDIUM}
            onClick={() => props.history.push('/admin/preference/menu')}
        >
            Preference
        </NeonButton>
    </React.Fragment>);
};
