/**
 * @author WMXPY
 * @namespace Organization
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
import { buildAdminOrganizationEdit, buildAdminOrganizationMembers } from "../util/path";
import { activateOrganizationRepository } from "./repository/activate";
import { deactivateOrganizationRepository } from "./repository/deactivate";

const activateOrganization = async (organization: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to activate "${organization}"?`);
    if (isConfirm) {
        try {
            await activateOrganizationRepository(organization);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const deactivateOrganization = async (organization: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to deactivate "${organization}"?`);
    if (isConfirm) {
        try {
            await deactivateOrganizationRepository(organization);
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

type OrganizationMoreProps = RouteComponentProps & ConnectedStates;

export const OrganizationMoreBase: React.FC<OrganizationMoreProps> = (props: OrganizationMoreProps) => {

    const params: any = props.match.params;
    const organization: string = decodeURIComponent(params.organization);

    return (<div>
        <GoBack
            right="Edit"
            onClickRight={() => props.history.push('/admin/organization/e/' + encodeURIComponent(organization))}
        />
        <NamedTitle about="More About Organization">
            {organization}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={`Add exist account to "${organization}" organization.`}
                link="Add"
                onClick={() => props.history.push('/admin/organization/a/' + encodeURIComponent(organization))}
            />
            <MenuItem
                description={`Register new account for organization "${organization}"`}
                link="Register"
                onClick={() => props.history.push('/admin/organization/register/' + encodeURIComponent(organization))}
            />
            <MenuItem
                description={`See Members of "${organization}"`}
                link="Members"
                onClick={() => props.history.push(buildAdminOrganizationMembers(organization))}
            />
            <MenuItem
                description={`Activate "${organization}"`}
                link="Activate"
                onClick={() => activateOrganization(organization, () => props.history.replace(buildAdminOrganizationEdit(organization)))}
            />
            <MenuItem
                description={`Deactivate "${organization}"`}
                link="Deactivate"
                onClick={() => deactivateOrganization(organization, () => props.history.replace(buildAdminOrganizationEdit(organization)))}
            />
        </div>
    </div>);
};

export const OrganizationMore: React.ComponentType = connector.connect(OrganizationMoreBase);
