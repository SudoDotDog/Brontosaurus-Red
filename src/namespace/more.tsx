/**
 * @author WMXPY
 * @namespace Namespace
 * @description More
 */

import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import MenuStyle from "../../style/components/menu.scss";
import { GoBack } from "../components/go-back";
import { MenuItem } from "../components/menu-item";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { buildAdminNamespaceEdit, buildAdminNamespaceMembers } from "../util/path";
import { TitleManager } from "../util/title";
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

    React.useEffect(() => {

        TitleManager.setNestedPage(PROFILE.NAMESPACE, PROFILE.MORE, namespace);
        return () => TitleManager.restoreVoid();
    }, []);

    return (<div>
        <GoBack
            right={props.language.get(PROFILE.EDIT)}
            onClickRight={() => {
                props.history.push(
                    buildAdminNamespaceEdit(namespace),
                );
            }}
        />
        <NamedTitle about={props.language.get(
            PROFILE.MORE_ABOUT,
            props.language.get(PROFILE.NAMESPACE)
        )}>
            {namespace}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={props.language.get(
                    PROFILE.VIEW_MEMBERS_OF_INSTANCE,
                    namespace,
                    props.language.get(PROFILE.NAMESPACE),
                )}
                link={props.language.get(PROFILE.MEMBERS)}
                onClick={() => props.history.push(buildAdminNamespaceMembers(namespace))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.ACTIVATE_INSTANCE,
                    namespace,
                    props.language.get(PROFILE.NAMESPACE),
                )}
                link={props.language.get(PROFILE.ACTIVATE)}
                onClick={() => {
                    activateNamespace(
                        namespace,
                        () => {
                            props.history.replace(
                                buildAdminNamespaceEdit(namespace),
                            );
                        },
                    );
                }}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.DEACTIVATE_INSTANCE,
                    namespace,
                    props.language.get(PROFILE.NAMESPACE),
                )}
                link={props.language.get(PROFILE.DEACTIVATE)}
                dangerous
                onClick={() => deactivateNamespace(namespace, () => props.history.replace(buildAdminNamespaceEdit(namespace)))}
            />
        </div>
    </div>);
};

export const NamespaceMore: React.ComponentType = connector.connect(NamespaceMoreBase);
