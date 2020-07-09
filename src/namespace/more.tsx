/**
 * @author WMXPY
 * @namespace Namespace
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
import { buildAdminNamespaceEdit, buildAdminNamespaceMembers } from "../util/path";
import { activateNamespaceRepository } from "./repository/activate";
import { deactivateNamespaceRepository } from "./repository/deactivate";

const activateNamespace = async (namespace: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to activate "${namespace}"?`);
    if (isConfirm) {
        try {
            await activateNamespaceRepository(namespace);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const deactivateNamespace = async (namespace: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to deactivate "${namespace}"?`);
    if (isConfirm) {
        try {
            await deactivateNamespaceRepository(namespace);
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

type NamespaceMoreProps = RouteComponentProps & ConnectedStates;

export const NamespaceMoreBase: React.FC<NamespaceMoreProps> = (props: NamespaceMoreProps) => {

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
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={`See Members of "${namespace}"`}
                link="Members"
                onClick={() => props.history.push(buildAdminNamespaceMembers(namespace))}
            />
            <MenuItem
                description={`Activate "${namespace}"`}
                link="Activate"
                onClick={() => activateNamespace(namespace, () => props.history.replace(buildAdminNamespaceEdit(namespace)))}
            />
            <MenuItem
                description={`Deactivate "${namespace}"`}
                link="Deactivate"
                onClick={() => deactivateNamespace(namespace, () => props.history.replace(buildAdminNamespaceEdit(namespace)))}
            />
        </div>
    </div>);
};

export const NamespaceMore: React.ComponentType = connector.connect(NamespaceMoreBase);
