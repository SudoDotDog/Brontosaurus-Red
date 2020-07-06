/**
 * @author WMXPY
 * @namespace Group
 * @description More
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { GoBack } from "../components/go-back";
import { MenuItem } from "../components/menu-item";
import { NamedTitle } from "../components/named-title";
import { buildAdminGroupMembers } from "../util/path";
import { removeAllGroupRepository } from "./repository/remove-all";
import { activateGroupRepository } from "./repository/activate";
import { deactivateGroupRepository } from "./repository/deactivate";

export type GroupMoreProps = {
} & RouteComponentProps;

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

export const GroupMore: React.FC<GroupMoreProps> = (props: GroupMoreProps) => {

    const params: any = props.match.params;
    const group: string = decodeURIComponent(params.group);

    return (<div>
        <GoBack
            right="Edit"
            onClickRight={() => props.history.push('/admin/group/e/' + encodeURIComponent(group))}
        />
        <NamedTitle about="More About Group">
            {group}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={`Remove Group "${group}" in All Accounts`}
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
                onClick={() => activateGroup(group, () => props.history.replace('/admin/group'))}
            />
            <MenuItem
                description={`Deactivate "${group}"`}
                link="Deactivate"
                onClick={() => deactivateGroup(group, () => props.history.replace('/admin/group'))}
            />
        </div>
    </div>);
};
