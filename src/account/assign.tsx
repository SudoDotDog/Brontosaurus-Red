/**
 * @author WMXPY
 * @namespace Account
 * @description Assign
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE } from "@sudoo/neon/declare";
import { NeonApplicable } from "@sudoo/neon/input";
import { NeonTable } from "@sudoo/neon/table";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { PageSelector } from "../components/page-selector";
import { fetchOrganization, FetchOrganizationResponse, OrganizationResponse } from "../organization/repository/organization-fetch";
import { setOrganizationRepository } from "./repository/set-organization";

export type AccountOrganizationAssignProps = {
} & RouteComponentProps;

export type AccountOrganizationAssignStates = {

    readonly organizations: OrganizationResponse[];
    readonly keyword: string;
    readonly pages: number;
    readonly page: number;
};

export class AccountOrganizationAssign extends React.Component<AccountOrganizationAssignProps, AccountOrganizationAssignStates> {

    public readonly state: AccountOrganizationAssignStates = {

        organizations: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public constructor(props: AccountOrganizationAssignProps) {

        super(props);
        this._searchOrganization = this._searchOrganization.bind(this);
    }

    public render() {

        return (
            <div>
                <NeonSub onClick={() => this.props.history.goBack()}>Go Back</NeonSub>
                <NeonTitle margin={MARGIN.MEDIUM}>Set {this._getUsername()}'s Organization</NeonTitle>

                <NeonApplicable
                    size={SIZE.MEDIUM}
                    label={'Search Target Organization'}
                    onApply={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchOrganization)}
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
                    onClick={() => this._assign(organization.name)}
                    size={SIZE.RELATIVE}>
                    Assign To
                </NeonButton></td>
            </tr>),
        );
    }

    private async _assign(organization: string) {

        const username: string = this._getUsername();
        const validation: boolean = window.confirm(`Assign "${username}" to "${organization}"?`);

        if (validation) {
            await setOrganizationRepository(username, organization);
            this.props.history.push('/user/e/' + username);
        }
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

    private _getUsername(): string {

        const params: any = this.props.match.params;
        return params.username;
    }
}
