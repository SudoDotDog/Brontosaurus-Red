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

export type ApplicationMoreProps = {
} & RouteComponentProps;

const refreshGreen = async (organization: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to refresh "${organization}"'s green token?`);
    if (isConfirm) {
        try {
            await refreshGreenRepository(organization);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const refreshKey = async (organization: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to refresh "${organization}"'s secret key?`);
    if (isConfirm) {
        try {
            await refreshKeyRepository(organization);
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
        </div>
    </div>);
};
