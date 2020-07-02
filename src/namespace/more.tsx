/**
 * @author WMXPY
 * @namespace Namespace
 * @description More
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { GoBack } from "../components/go-back";
import { MenuItem } from "../components/menu-item";
import { NamedTitle } from "../components/named-title";
import { buildAdminNamespaceMembers } from "../util/path";

export type NamespaceMoreProps = {
} & RouteComponentProps;

export const NamespaceMore: React.FC<NamespaceMoreProps> = (props: NamespaceMoreProps) => {

    const params: any = props.match.params;
    const namespace: string = decodeURIComponent(params.namespace);

    return (<div>
        <GoBack
            right="Edit"
            onClickRight={() => props.history.push('/admin/namespace/e/' + encodeURIComponent(namespace))}
        />
        <NamedTitle about="More About Namespace">
            {namespace}
        </NamedTitle>
        <div className={MenuStyle.menuGrid}>
            <MenuItem
                description={`See Members of "${namespace}"`}
                link="Members"
                onClick={() => props.history.push(buildAdminNamespaceMembers(namespace))}
            />
        </div>
    </div>);
};
