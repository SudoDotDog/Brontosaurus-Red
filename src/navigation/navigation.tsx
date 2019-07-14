/**
 * @author WMXPY
 * @namespace Page
 * @description Navigation
 */

import { BrontosaurusProps, EnableForGroup, WithAuthComponent, withBrontosaurus } from "@brontosaurus/react";
import { Brontosaurus, Token } from "@brontosaurus/web";
import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as NavStyle from "../../style/page/nav.scss";
import * as EntryStyle from "../../style/route/entry.scss";
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

    const organization: string | undefined = Brontosaurus.hard().organization;
    const username: string | undefined = Brontosaurus.hard().username;

    return (
        <div className={NavStyle.navWrapper}>
            <div className={NavStyle.mainArea}>

                <NeonButton
                    size={SIZE.MEDIUM}
                    onClick={() => props.history.push('/me/menu')}
                >
                    {username}
                </NeonButton>
                {
                    organization &&
                    <NeonButton
                        buttonClassName={NavStyle.organizationButton}
                        size={SIZE.MEDIUM}
                        onClick={() => props.history.push('/current/menu')}
                    >
                        {organization}
                    </NeonButton>
                }
                <EnableForGroup

                    visit
                    group={['BRONTOSAURUS_SUPER_ADMIN']}>
                    <NeonButton
                        buttonClassName={NavStyle.organizationButton}
                        size={SIZE.MEDIUM}
                        onClick={() => props.history.push('/admin')}
                    >
                        Admin
                    </NeonButton>
                </EnableForGroup>
            </div>
            <div className={NavStyle.subArea}>
                <EnableForGroup

                    visit
                    group={['BRONTOSAURUS_SUPER_ADMIN']}>
                    <SubMenuRoute />
                </EnableForGroup>
            </div>
            <div className={NavStyle.outArea}>
                {renderAuthButton(props.auth.visit())}
            </div>
        </div>
    );
};

export const Nav: WithAuthComponent<NavProp> = withBrontosaurus(NavBase);
