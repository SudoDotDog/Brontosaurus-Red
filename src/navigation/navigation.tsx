/**
 * @author WMXPY
 * @namespace Navigation
 * @description Navigation
 */

import { EnableForGroup } from "@brontosaurus/react";
import { Brontosaurus, Token } from "@brontosaurus/web";
import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import NavStyle from "../../style/page/nav.scss";
import EntryStyle from "../../style/route/entry.scss";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { NavButton } from "./nav-button";
import { SubMenuRoute } from "./sub-menu";

type ConnectedNavStates = {

    readonly language: SudooFormat;
};

type NavProp = {
} & RouteComponentProps & ConnectedNavStates;

const connector = Connector.create<IStore, ConnectedNavStates>()
    .connectStates(({ preference }: IStore) => ({

        language: intl.format(preference.language),
    }));

const renderAuthButton = (token: Token, language: SudooFormat): React.ReactNode => {

    if (token) {
        return (<span>
            {language.get(
                PROFILE.WELCOME_HELLO,
                token.username,
            )}
            &nbsp;
            <a
                className={EntryStyle["sign-in"]}
                onClick={() => Brontosaurus.logout()}
            >
                {language.get(PROFILE.SIGN_OUT)}
            </a>
        </span>);
    }

    return null;
};

const NavBase: React.FC<NavProp> = (props: NavProp) => {

    const token: Token = Brontosaurus.hard();

    const username: string = token.username;
    const organization: string | undefined = token.organization;

    return (
        <div className={NavStyle["nav-wrapper"]}>
            <div className={NavStyle["main-area"]}>
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
                        {props.language.get(PROFILE.ADMIN)}
                    </NavButton>
                </EnableForGroup>
            </div>
            <div className={NavStyle["sub-area"]}>
                <SubMenuRoute />
            </div>
            <div className={NavStyle["out-area"]}>
                {renderAuthButton(token, props.language)}
            </div>
        </div>
    );
};

export const Nav: React.ComponentType<unknown> = connector.connect(NavBase);
