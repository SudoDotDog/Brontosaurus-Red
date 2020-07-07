/**
 * @author WMXPY
 * @namespace Tag
 * @description More
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { GoBack } from "../components/go-back";
import { MenuItem } from "../components/menu-item";
import { NamedTitle } from "../components/named-title";
import { buildAdminTagMembers } from "../util/path";
import { activateTagRepository } from "./repository/activate";
import { deactivateTagRepository } from "./repository/deactivate";

export type TagMoreProps = {
} & RouteComponentProps;

const activateTag = async (tag: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to activate "${tag}"?`);
    if (isConfirm) {
        try {
            await activateTagRepository(tag);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const deactivateTag = async (tag: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to deactivate "${tag}"?`);
    if (isConfirm) {
        try {
            await deactivateTagRepository(tag);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

export const TagMore: React.FC<TagMoreProps> = (props: TagMoreProps) => {

    const params: any = props.match.params;
    const tag: string = decodeURIComponent(params.tag);

    return (<div>
        <GoBack
            right="Edit"
            onClickRight={() => props.history.push('/admin/tag/e/' + encodeURIComponent(tag))}
        />
        <NamedTitle about="More About Tag">
            {tag}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={`See Members of "${tag}"`}
                link="Members"
                onClick={() => props.history.push(buildAdminTagMembers(tag))}
            />
        </div>
    </div>);
};
