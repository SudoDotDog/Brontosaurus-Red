/**
 * @author WMXPY
 * @namespace Navigation
 * @description Index Menu
 */

import { EnableForGroup } from "@brontosaurus/react";
import { Brontosaurus, Token } from "@brontosaurus/web";
import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";

export type IndexMenuBaseProps = {

    readonly accountName: string;
    readonly commandCenterName: string;
};

type IndexMenuBaseStates = {

    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, IndexMenuBaseStates>()
    .connectStates(({ preference }: IStore) => ({

        language: intl.format(preference.language),
    }));

export type IndexMenuProps = IndexMenuBaseProps & RouteComponentProps & IndexMenuBaseStates;

export const IndexMenuBase: React.FC<IndexMenuProps> = (props: IndexMenuProps) => {

    const token: Token = Brontosaurus.hard();

    const username: string = token.username;
    const organization: string | undefined = token.organization;

    const welcomeMessage = organization ? `${username} - ${organization}` : username;

    return (<div>
        <NamedTitle about={props.language.get(PROFILE.WELCOME)}>
            {welcomeMessage}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <EnableForGroup
                visit={false}
                group={['BRONTOSAURUS_SELF_CONTROL']}>
                <MenuItem
                    description={props.language.get(
                        PROFILE.SELF_CONTROL_DESCRIPTION,
                        props.accountName,
                        username,
                    )}
                    link={props.language.get(PROFILE.MY_ACCOUNT)}
                    onClick={() => props.history.push('/me')}
                />
            </EnableForGroup>
            <EnableForGroup
                visit={false}
                validation={() => Boolean(token.organization)}
                group={['BRONTOSAURUS_ORGANIZATION_CONTROL']}>
                <MenuItem
                    description={props.language.get(
                        PROFILE.ORGANIZATION_CONTROL_DESCRIPTION,
                        organization ?? 'UNKNOWN',
                        organization ?? 'UNKNOWN',
                    )}
                    link={props.language.get(PROFILE.MY_ORGANIZATION)}
                    onClick={() => props.history.push('/current')}
                />
            </EnableForGroup>
            <EnableForGroup
                visit={false}
                group={['BRONTOSAURUS_SUPER_ADMIN']}>
                <MenuItem
                    description={props.language.get(
                        PROFILE.ADMIN_PANEL_DESCRIPTION,
                        props.commandCenterName,
                    )}
                    link={props.language.get(PROFILE.ADMIN_PANEL)}
                    onClick={() => props.history.push('/admin')}
                />
            </EnableForGroup>
        </div>
    </div>);
};

export const IndexMenu: React.ComponentType<IndexMenuBaseProps> = connector.connect(IndexMenuBase);
