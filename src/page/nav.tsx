/**
 * @author WMXPY
 * @namespace Page
 * @description Nav
 */

import { BrontosaurusProps, EnableForGroup, WithAuthComponent, withBrontosaurus } from "@brontosaurus/react";
import { Brontosaurus, Token } from "@brontosaurus/web";
import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as EntryStyle from "../../style/route/entry.scss";

type NavProp = {
} & RouteComponentProps & BrontosaurusProps;

const renderAuthButton = (token: Token | null): React.ReactNode => {

    if (token) {
        return (
            <NeonButton
                size={SIZE.MEDIUM}
                onClick={() => Brontosaurus.logout(true)}
            >
                Logout from {token.username}
            </NeonButton>
        );
    }

    return (
        <NeonButton
            size={SIZE.MEDIUM}
            onClick={() => Brontosaurus.token()}
        >
            Sign-in
        </NeonButton>
    );
};

const NavBase: React.SFC<NavProp> = (props: NavProp) => {

    return (<React.Fragment>

        <div></div>
        <EnableForGroup visit group={['BRONTOSAURUS_SUPER_ADMIN']}>
            <NeonButton
                size={SIZE.MEDIUM}
                onClick={() => props.history.push('/register')}
            >
                User
            </NeonButton>
            <NeonButton
                size={SIZE.MEDIUM}
                onClick={() => props.history.push('/preference')}
            >
                Preference
            </NeonButton>
        </EnableForGroup>
        <div className={EntryStyle.menu}></div>
        {renderAuthButton(props.auth.visit())}
    </React.Fragment>);
};

export const Nav: WithAuthComponent<NavProp> = withBrontosaurus(NavBase);
