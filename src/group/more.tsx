/**
 * @author WMXPY
 * @namespace Group
 * @description More
 */

import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { GoBack } from "../components/go-back";
import { MenuItem } from "../components/menu-item";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { IStore } from "../state/declare";
import { buildAdminGroupEdit, buildAdminGroupMembers } from "../util/path";
import { activateGroupRepository } from "./repository/activate";
import { deactivateGroupRepository } from "./repository/deactivate";
import { removeAllGroupRepository } from "./repository/remove-all";
import { PROFILE } from "../i18n/profile";

const activateGroup = async (group: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to activate "${group}"?`);
    if (isConfirm) {
        try {
            await activateGroupRepository(group);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const deactivateGroup = async (group: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to deactivate "${group}"?`);
    if (isConfirm) {
        try {
            await deactivateGroupRepository(group);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const removeAllGroup = async (group: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to remove "${group}" in ALL accounts?`);
    if (isConfirm) {
        try {
            await removeAllGroupRepository(group);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type GroupMoreProps = RouteComponentProps & ConnectedStates;

export const GroupMoreBase: React.FC<GroupMoreProps> = (props: GroupMoreProps) => {

    const params: any = props.match.params;
    const group: string = decodeURIComponent(params.group);

    return (<div>
        <GoBack
            right={props.language.get(PROFILE.EDIT)}
            onClickRight={() => props.history.push('/admin/group/e/' + encodeURIComponent(group))}
        />
        <NamedTitle about={props.language.get(
            PROFILE.MORE_ABOUT,
            props.language.get(PROFILE.GROUP),
        )}>
            {group}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={`Remove Group "${group}" in All Accounts`}
                dangerous
                link="Remove All"
                onClick={() => removeAllGroup(group, () => props.history.replace(`/admin/group/e/${params.group}`))}
            />
            <MenuItem
                description={`See Members of "${group}"`}
                link="Members"
                onClick={() => props.history.push(buildAdminGroupMembers(group))}
            />
            <MenuItem
                description={`Activate "${group}"`}
                link="Activate"
                onClick={() => activateGroup(group, () => props.history.replace(buildAdminGroupEdit(group)))}
            />
            <MenuItem
                description={`Deactivate "${group}"`}
                dangerous
                link="Deactivate"
                onClick={() => deactivateGroup(group, () => props.history.replace(buildAdminGroupEdit(group)))}
            />
        </div>
    </div>);
};

export const GroupMore: React.ComponentType = connector.connect(GroupMoreBase);
