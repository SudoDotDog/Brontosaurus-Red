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
import * as NavStyle from "../../style/page/nav.scss";
import * as EntryStyle from "../../style/route/entry.scss";

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

    return (
        <React.Fragment>
            <NeonButton
                size={SIZE.MEDIUM}
                onClick={() => props.history.push('/me/menu')}
            >
                Me
            </NeonButton>
            {
                organization &&
                <NeonButton
                    buttonClassName={NavStyle.organizationButton}
                    size={SIZE.MEDIUM}
                    onClick={() => props.history.push('/current')}
                >
                    {organization}
                </NeonButton>
            }
            <div style={{
                width: '10px',
            }} />
            <EnableForGroup

                visit
                group={['BRONTOSAURUS_SUPER_ADMIN']}>
                <NeonButton
                    size={SIZE.MEDIUM}
                    onClick={() => props.history.push('/user/list')}
                >
                    Account
                </NeonButton>
                <NeonButton
                    size={SIZE.MEDIUM}
                    onClick={() => props.history.push('/organization/list')}
                >
                    Organization
                </NeonButton>
                <NeonButton
                    size={SIZE.MEDIUM}
                    onClick={() => props.history.push('/group/list')}
                >
                    Group
                </NeonButton>
                <NeonButton
                    size={SIZE.MEDIUM}
                    onClick={() => props.history.push('/application/list')}
                >
                    Application
                </NeonButton>
                <NeonButton
                    size={SIZE.MEDIUM}
                    onClick={() => props.history.push('/preference')}
                >
                    Preference
                </NeonButton>
            </EnableForGroup>
            <div style={{
                flex: 1,
            }} />
            {renderAuthButton(props.auth.visit())}
        </React.Fragment>
    );
};

export const Nav: WithAuthComponent<NavProp> = withBrontosaurus(NavBase);
