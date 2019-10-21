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
import { removeAllGroupRepository } from "./repository/remove-all";

export type ApplicationMoreProps = {
} & RouteComponentProps;

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

export const GroupMore: React.FC<ApplicationMoreProps> = (props: ApplicationMoreProps) => {

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
        <div className={MenuStyle.menuGrid}>
            <MenuItem
                description={`Remove Group "${group}" in All Accounts`}
                link="Remove All"
                onClick={() => removeAllGroup(group, () => props.history.replace(`/admin/group/e/${params.group}`))}
            />
        </div>
    </div>);
};
