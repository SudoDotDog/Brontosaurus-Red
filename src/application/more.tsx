/**
 * @author WMXPY
 * @namespace Application
 * @description More
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { GoBack } from "../components/go-back";
import { MenuItem } from "../components/menu-item";
import { NamedTitle } from "../components/named-title";
import { refreshGreenRepository } from "./repository/refresh-green";
import { refreshKeyRepository } from "./repository/refresh-key";
import { toggleGreenAccessRepository } from "./repository/toggle-green-access";
import { togglePortalAccessRepository } from "./repository/toggle-portal-access";

export type ApplicationMoreProps = {
} & RouteComponentProps;

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

export const ApplicationMore: React.FC<ApplicationMoreProps> = (props: ApplicationMoreProps) => {

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
        <div className={MenuStyle.menuGrid}>
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
            <MenuItem
                description={`Set Redirection "${application}"`}
                link="Go to Redirection"
                onClick={() => props.history.push('/admin/application/redirection/' + encodeURIComponent(application))}
            />
        </div>
    </div>);
};
