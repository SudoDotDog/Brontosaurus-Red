/**
 * @author WMXPY
 * @namespace Organization
 * @description Organization
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonTable } from "@sudoo/neon/table";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { ClickableSpan } from "../components/clickable-span";
import { PageSelector } from "../components/page-selector";
import { SearchDoubleNew } from "../components/search-di-new";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { buildAdminAccountEdit } from "../util/path";
import { fetchOrganization, FetchOrganizationResponse, OrganizationResponse } from "./repository/organization-fetch";

export type OrganizationStates = {

    readonly organizations: OrganizationResponse[];
    readonly keyword: string;
    readonly pages: number;
    readonly page: number;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

type ConnectedProps = RouteComponentProps & ConnectedStates;

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export class OrganizationBase extends React.Component<ConnectedProps, OrganizationStates> {

    public readonly state: OrganizationStates = {

        organizations: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public constructor(props: ConnectedProps) {

        super(props);
        this._searchOrganization = this._searchOrganization.bind(this);
    }

    public render() {

        return (
            <div>
                <SearchDoubleNew
                    label="Organization"
                    onSearch={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchOrganization)}
                    onNew={() => this.props.history.push('/admin/organization/create')}
                    onInplode={() => this.props.history.push('/admin/organization/inplode')}
                />

                {this.state.organizations.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            this.props.language.get(PROFILE.NAME),
                            this.props.language.get(PROFILE.OWNER),
                            this.props.language.get(PROFILE.OWNER_DISPLAY),
                            this.props.language.get(PROFILE.DECORATORS),
                            this.props.language.get(PROFILE.TAGS),
                            this.props.language.get(PROFILE.ACTION),
                        ]}
                        style={{ marginTop: '1rem' }}>
                        {this._renderOrganizations()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, this._searchOrganization)}
                />
            </div>
        );
    }

    private _renderOrganizations(): JSX.Element[] {

        return this.state.organizations.map((organization: OrganizationResponse) =>
            (<tr key={organization.name}>
                <td>
                    <ClickableSpan
                        to={'/admin/organization/e/' + encodeURIComponent(organization.name)}
                        red={!organization.active}
                    >
                        {organization.name}
                    </ClickableSpan>
                </td>
                <td>
                    <ClickableSpan
                        to={buildAdminAccountEdit(organization.owner, organization.ownerNamespace)}
                        red={!organization.ownerActive}
                    >
                        {organization.owner}
                    </ClickableSpan>
                </td>
                <td>{organization.ownerDisplayName}</td>
                <td>{organization.decorators}</td>
                <td>{organization.tags}</td>
                <td className={MenuStyle.actionRaw}>
                    <NeonButton
                        className={MenuStyle.actionButton}
                        onClick={() => this.props.history.push('/admin/organization/more/' + encodeURIComponent(organization.name))}
                        size={SIZE.RELATIVE}>
                        {this.props.language.get(PROFILE.MORE)}
                    </NeonButton>
                </td>
            </tr>),
        );
    }

    private async _searchOrganization() {

        const response: FetchOrganizationResponse = await fetchOrganization(
            this.state.keyword,
            this.state.page,
        );
        this.setState({
            organizations: response.organizations,
            pages: response.pages,
        });
    }
}

export const Organization: React.ComponentType<{}> = connector.connect(OrganizationBase);
