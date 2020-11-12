/**
 * @author WMXPY
 * @namespace Application
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
import { buildAdminApplicationEdit } from "../util/path";
import { TitleManager } from "../util/title";
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

    React.useEffect(() => {

        TitleManager.setNestedPage(PROFILE.APPLICATION, PROFILE.MORE, application);
        return () => TitleManager.restoreVoid();
    }, []);

    return (<div>
        <GoBack
            right={props.language.get(PROFILE.EDIT)}
            onClickRight={() => props.history.push('/admin/application/e/' + encodeURIComponent(application))}
        />
        <NamedTitle about={props.language.get(
            PROFILE.MORE_ABOUT,
            props.language.get(PROFILE.APPLICATION)
        )}>
            {application}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={props.language.get(
                    PROFILE.ACTIVATE_INSTANCE,
                    application,
                    props.language.get(PROFILE.APPLICATION),
                )}
                link={props.language.get(PROFILE.ACTIVATE)}
                onClick={() => activateApplication(application, () => props.history.replace(buildAdminApplicationEdit(application)))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.DEACTIVATE_INSTANCE,
                    application,
                    props.language.get(PROFILE.APPLICATION),
                )}
                link={props.language.get(PROFILE.DEACTIVATE)}
                dangerous
                onClick={() => deactivateApplication(application, () => props.history.replace(buildAdminApplicationEdit(application)))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.REFRESH_SOMETHING_OF_INSTANCE,
                    props.language.get(PROFILE.GREEN_TOKEN),
                    props.language.get(PROFILE.APPLICATION),
                    application,
                )}
                link={props.language.get(PROFILE.REFRESH)}
                dangerous
                onClick={() => refreshGreen(application, () => props.history.replace(buildAdminApplicationEdit(application)))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.RESET_RSA_SHA_KEY_OF_INSTANCE,
                    props.language.get(PROFILE.APPLICATION),
                    application,
                )}
                link={props.language.get(PROFILE.RESET)}
                dangerous
                onClick={() => refreshKey(application, () => props.history.replace(`/admin/application/e/${params.application}`))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.TOGGLE_SOMETHING_AUTHORIZATION_OF_INSTANCE,
                    props.language.get(PROFILE.GREEN_ACCESS_WITH_SPACE),
                    props.language.get(PROFILE.APPLICATION),
                    application,
                )}
                link={props.language.get(
                    PROFILE.TOGGLE_SOMETHING_AUTHORIZATION,
                    props.language.get(PROFILE.GREEN_ACCESS_WITH_SPACE),
                )}
                dangerous
                onClick={() => toggleGreenAccess(application, () => props.history.replace(`/admin/application/e/${params.application}`))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.TOGGLE_SOMETHING_AUTHORIZATION_OF_INSTANCE,
                    props.language.get(PROFILE.PORTAL_ACCESS),
                    props.language.get(PROFILE.APPLICATION),
                    application,
                )}
                link={props.language.get(
                    PROFILE.TOGGLE_SOMETHING_AUTHORIZATION,
                    props.language.get(PROFILE.PORTAL_ACCESS),
                )}
                dangerous
                onClick={() => togglePortalAccess(application, () => props.history.replace(`/admin/application/e/${params.application}`))}
            />
        </div>
    </div>);
};

export const ApplicationMore: React.ComponentType = connector.connect(ApplicationMoreBase);
