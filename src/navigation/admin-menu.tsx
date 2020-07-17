/**
 * @author WMXPY
 * @namespace Navigation
 * @description Admin Menu
 */

import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { TitleManager } from "../util/title";

export type AdminMenuBaseProps = {
} & RouteComponentProps;

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type AdminMenuProps = AdminMenuBaseProps & ConnectedStates;

export const AdminMenuBase: React.FC<AdminMenuProps> = (props: AdminMenuProps) => {

    React.useEffect(() => {

        TitleManager.setSubPage(PROFILE.ADMIN_PANEL);
        return () => TitleManager.restoreVoid();
    }, []);

    return (<div className={MenuStyle["menu-grid"]}>
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_CREATE_MODIFY_INSTANCE,
                props.language.get(PROFILE.ACCOUNTS),
            )}
            link={props.language.get(PROFILE.ACCOUNT)}
            onClick={() => props.history.push('/admin/account')}
        />
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_CREATE_MODIFY_INSTANCE,
                props.language.get(PROFILE.ORGANIZATIONS),
            )}
            link={props.language.get(PROFILE.ORGANIZATION)}
            onClick={() => props.history.push('/admin/organization')}
        />
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_CREATE_MODIFY_INSTANCE,
                props.language.get(PROFILE.GROUPS),
            )}
            link={props.language.get(PROFILE.GROUP)}
            onClick={() => props.history.push('/admin/group')}
        />
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_CREATE_MODIFY_INSTANCE,
                props.language.get(PROFILE.DECORATORS),
            )}
            link={props.language.get(PROFILE.DECORATOR)}
            onClick={() => props.history.push('/admin/decorator')}
        />
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_CREATE_MODIFY_INSTANCE,
                props.language.get(PROFILE.NAMESPACES),
            )}
            link={props.language.get(PROFILE.NAMESPACE)}
            onClick={() => props.history.push('/admin/namespace')}
        />
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_CREATE_MODIFY_INSTANCE,
                props.language.get(PROFILE.TAGS),
            )}
            link={props.language.get(PROFILE.TAG)}
            onClick={() => props.history.push('/admin/tag')}
        />
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_CREATE_MODIFY_INSTANCE,
                props.language.get(PROFILE.APPLICATIONS),
            )}
            link={props.language.get(PROFILE.APPLICATION)}
            onClick={() => props.history.push('/admin/application')}
        />
        <MenuItem
            description={props.language.get(
                PROFILE.MODIFY_INSTANCE,
                props.language.get(PROFILE.PREFERENCES),
            )}
            link={props.language.get(PROFILE.PREFERENCE)}
            onClick={() => props.history.push('/admin/preference')}
        />
    </div>);
};

export const AdminMenu: React.ComponentType<AdminMenuProps> = connector.connect(AdminMenuBase);
