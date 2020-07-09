/**
 * @author WMXPY
 * @namespace Application
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
import { buildAdminApplicationEdit } from "../util/path";
import { activateApplicationRepository } from "./repository/activate";
import { deactivateApplicationRepository } from "./repository/deactivate";
import { refreshGreenRepository } from "./repository/refresh-green";
import { refreshKeyRepository } from "./repository/refresh-key";
import { toggleGreenAccessRepository } from "./repository/toggle-green-access";
import { togglePortalAccessRepository } from "./repository/toggle-portal-access";

const activateApplication = async (application: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to activate "${application}"?`);
    if (isConfirm) {
        try {
            await activateApplicationRepository(application);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const deactivateApplication = async (application: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to deactivate "${application}"?`);
    if (isConfirm) {
        try {
            await deactivateApplicationRepository(application);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const refreshGreen = async (applicationKey: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to refresh "${applicationKey}"'s green token?`);
    if (isConfirm) {
        try {
            await refreshGreenRepository(applicationKey);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const refreshKey = async (applicationKey: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to refresh "${applicationKey}"'s secret key?`);
    if (isConfirm) {
        try {
            await refreshKeyRepository(applicationKey);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const toggleGreenAccess = async (applicationKey: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to toggle "${applicationKey}"'s green access?`);
    if (isConfirm) {
        try {
            await toggleGreenAccessRepository(applicationKey);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const togglePortalAccess = async (applicationKey: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to toggle "${applicationKey}"'s portal access?`);
    if (isConfirm) {
        try {
            await togglePortalAccessRepository(applicationKey);
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

type ApplicationMoreProps = RouteComponentProps & ConnectedStates;

export const ApplicationMoreBase: React.FC<ApplicationMoreProps> = (props: ApplicationMoreProps) => {

    const params: any = props.match.params;
    const application: string = decodeURIComponent(params.application);

    return (<div>
        <GoBack
            right="Edit"
            onClickRight={() => props.history.push('/admin/application/e/' + encodeURIComponent(application))}
        />
        <NamedTitle about="More About Application">
            {application}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={`Activate "${application}"`}
                link="Activate"
                onClick={() => activateApplication(application, () => props.history.replace(buildAdminApplicationEdit(application)))}
            />
            <MenuItem
                description={`Deactivate "${application}"`}
                link="Deactivate"
                onClick={() => deactivateApplication(application, () => props.history.replace(buildAdminApplicationEdit(application)))}
            />
            <MenuItem
                description={`Refresh "${application}"'s Green Token`}
                link="Refresh"
                onClick={() => refreshGreen(application, () => props.history.replace(`/admin/application/e/${params.application}`))}
            />
            <MenuItem
                description={`Reset "${application}"'s RSA-SHA256 Key`}
                link="Reset"
                onClick={() => refreshKey(application, () => props.history.replace(`/admin/application/e/${params.application}`))}
            />
            <MenuItem
                description={`Toggle Green Access for "${application}"`}
                link="Toggle Green Access"
                onClick={() => toggleGreenAccess(application, () => props.history.replace(`/admin/application/e/${params.application}`))}
            />
            <MenuItem
                description={`Toggle Portal Access for "${application}"`}
                link="Toggle Portal Access"
                onClick={() => togglePortalAccess(application, () => props.history.replace(`/admin/application/e/${params.application}`))}
            />
        </div>
    </div>);
};

export const ApplicationMore: React.ComponentType = connector.connect(ApplicationMoreBase);
