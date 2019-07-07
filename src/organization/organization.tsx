/**
 * @author WMXPY
 * @namespace Organization
 * @description Organization
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonTable } from "@sudoo/neon/table";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { PageSelector } from "../components/page-selector";
import { SearchDoubleNew } from "../components/search-di-new";
import { fetchOrganization, FetchOrganizationResponse, OrganizationResponse } from "./repository/organization-fetch";

export type OrganizationProps = {
} & RouteComponentProps;

export type OrganizationStates = {

    readonly organizations: OrganizationResponse[];
    readonly keyword: string;
    readonly pages: number;
    readonly page: number;
};

export class Organization extends React.Component<OrganizationProps, OrganizationStates> {

    public readonly state: OrganizationStates = {

        organizations: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public constructor(props: OrganizationProps) {

        super(props);
        this._searchOrganization = this._searchOrganization.bind(this);
    }

    public render() {

        return (
            <div>
                <SearchDoubleNew
                    label="Organization"
                    onSearch={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchOrganization)}
                    onNew={() => this.props.history.push('/organization/create')}
                    onInplode={() => this.props.history.push('/organization/inplode')}
                />

                {this.state.organizations.length === 0
                    ? void 0
                    : <NeonTable
                        headers={['Name', 'Owner', 'Action']}
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
                <td>{organization.name}</td>
                <td>{organization.owner}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/organization/e/' + encodeURIComponent(organization.name))}
                    size={SIZE.RELATIVE}>
                    Edit
                </NeonButton></td>
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
