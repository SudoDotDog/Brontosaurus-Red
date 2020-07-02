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

export type TagMoreProps = {
} & RouteComponentProps;

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
        <div className={MenuStyle.menuGrid}>
            <MenuItem
                description={`See Members of "${tag}"`}
                link="Members"
                onClick={() => props.history.push(buildAdminTagMembers(tag))}
            />
        </div>
    </div>);
};
