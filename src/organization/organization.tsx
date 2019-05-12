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
import { SearchNew } from "../components/search-new";
import { fetchOrganization, OrganizationResponse } from "./repository/organization-fetch";

type OrganizationProps = {
} & RouteComponentProps;

type OrganizationStates = {

    organizations: OrganizationResponse[];
};

export class Organization extends React.Component<OrganizationProps, OrganizationStates> {

    public state: OrganizationStates = {
        organizations: [],
    };

    public render() {

        return (
            <div>

                <SearchNew
                    label="Organization"
                    onSearch={async (keyword: string) => this.setState({ organizations: await fetchOrganization(keyword) })}
                    onNew={() => this.props.history.push('/organization/create')}
                />

                {this.state.organizations.length === 0
                    ? void 0
                    : <NeonTable
                        headers={['Name', 'Action']}
                        style={{ marginTop: '1rem' }}>
                        {this._renderOrganizations()}
                    </NeonTable>}
            </div>

        );
    }

    private _renderOrganizations(): JSX.Element[] {

        return this.state.organizations.map((organization: OrganizationResponse) =>
            (<tr key={organization.name}>
                <td>{organization.name}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/organization/e/' + organization.name)}
                    size={SIZE.RELATIVE}>
                    Edit
                </NeonButton></td>
            </tr>),
        );
    }
}
