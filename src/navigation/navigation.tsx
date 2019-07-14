/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation
 */

import { BrontosaurusProps, EnableForGroup, WithAuthComponent, withBrontosaurus } from "@brontosaurus/react";
import { Brontosaurus, Token } from "@brontosaurus/web";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as NavStyle from "../../style/page/nav.scss";
import * as EntryStyle from "../../style/route/entry.scss";
import { NavButton } from "./nav-button";
import { SubMenuRoute } from "./sub-menu";

type NavProp = {
} & RouteComponentProps & BrontosaurusProps;

const renderAuthButton = (token: Token | null): React.ReactNode => {

    if (token) {
        return (<span>
            Hello, {token.username} &nbsp;
                <a className={EntryStyle.signIn} onClick={() => Brontosaurus.logout(true)}>Sign-out</a>
        </span>);
    }

    return (<a
        className={EntryStyle.signIn}
        onClick={() => Brontosaurus.hard()}>
        Sign-in
    </a>);
};

const NavBase: React.FC<NavProp> = (props: NavProp) => {

    const token: Token = Brontosaurus.hard();

    const username: string = token.username;
    const organization: string | undefined = token.organization;

    return (
        <div className={NavStyle.navWrapper}>
            <div className={NavStyle.mainArea}>
                <NavButton
                    selected={props.location.pathname === '/'}
                    onClick={() => props.history.push('/')}
                >
                    ~
                </NavButton>
                <EnableForGroup
                    visit={false}
                    group={['BRONTOSAURUS_SELF_CONTROL']}>
                    <NavButton
                        selected={props.location.pathname.indexOf('/me') === 0}
                        onClick={() => props.history.push('/me')}
                    >
                        {username}
                    </NavButton>
                </EnableForGroup>
                <EnableForGroup
                    visit={false}
                    validation={() => Boolean(token.organization)}
                    group={['BRONTOSAURUS_ORGANIZATION_CONTROL']}>
                    <NavButton
                        selected={props.location.pathname.indexOf('/current') === 0}
                        onClick={() => props.history.push('/current')}
                    >
                        {organization}
                    </NavButton>
                </EnableForGroup>
                <EnableForGroup
                    visit={false}
                    group={['BRONTOSAURUS_SUPER_ADMIN']}>
                    <NavButton
                        selected={props.location.pathname.indexOf('/admin') === 0}
                        onClick={() => props.history.push('/admin')}
                    >
                        Admin
                    </NavButton>
                </EnableForGroup>
            </div>
            <div className={NavStyle.subArea}>
                <SubMenuRoute />
            </div>
            <div className={NavStyle.outArea}>
                {renderAuthButton(props.auth.visit())}
            </div>
        </div>
    );
};

export const Nav: WithAuthComponent<NavProp> = withBrontosaurus(NavBase);
