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
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { buildAdminOrganizationEdit, buildAdminOrganizationMembers } from "../util/path";
import { TitleManager } from "../util/title";
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

    React.useEffect(() => {

        TitleManager.setNestedPage(PROFILE.ORGANIZATION, PROFILE.MORE, organization);
        return () => TitleManager.restoreVoid();
    }, []);

    return (<div>
        <GoBack
            right={props.language.get(PROFILE.EDIT)}
            onClickRight={() => props.history.push('/admin/organization/e/' + encodeURIComponent(organization))}
        />
        <NamedTitle about={props.language.get(
            PROFILE.MORE_ABOUT,
            props.language.get(PROFILE.ORGANIZATION),
        )}>
            {organization}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={props.language.get(
                    PROFILE.ADD_EXIST_ACCOUNT_TO_ORGANIZATION,
                    organization,
                )}
                link={props.language.get(PROFILE.ADD)}
                onClick={() => props.history.push('/admin/organization/a/' + encodeURIComponent(organization))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.REGISTER_ACCOUNT_FOR_ORGANIZATION,
                    organization,
                )}
                link={props.language.get(PROFILE.REGISTER)}
                onClick={() => props.history.push('/admin/organization/register/' + encodeURIComponent(organization))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.VIEW_MEMBERS_OF_INSTANCE,
                    organization,
                    props.language.get(PROFILE.ORGANIZATION),
                )}
                link={props.language.get(PROFILE.MEMBERS)}
                onClick={() => props.history.push(buildAdminOrganizationMembers(organization))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.ACTIVATE_INSTANCE,
                    organization,
                    props.language.get(PROFILE.ORGANIZATION),
                )}
                link={props.language.get(PROFILE.ACTIVATE)}
                onClick={() => activateOrganization(organization, () => props.history.replace(buildAdminOrganizationEdit(organization)))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.DEACTIVATE_INSTANCE,
                    organization,
                    props.language.get(PROFILE.ORGANIZATION),
                )}
                link={props.language.get(PROFILE.DEACTIVATE)}
                dangerous
                onClick={() => deactivateOrganization(organization, () => props.history.replace(buildAdminOrganizationEdit(organization)))}
            />
        </div>
    </div>);
};

export const OrganizationMore: React.ComponentType = connector.connect(OrganizationMoreBase);
