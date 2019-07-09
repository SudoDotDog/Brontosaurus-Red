/**
 * @author WMXPY
 * @namespace Organization
 * @description Add Account
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE } from "@sudoo/neon/declare";
import { NeonApplicable } from "@sudoo/neon/input";
import { NeonTable } from "@sudoo/neon/table";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { setOrganizationRepository } from "../account/repository/set-organization";
import { fetchStandaloneAccount, FetchStandaloneAccountResponse, StandaloneAccountResponse } from "../account/repository/standalone-account-fetch";
import { PageSelector } from "../components/page-selector";

export type UserProp = {
} & RouteComponentProps;

export type UserState = {

    readonly users: StandaloneAccountResponse[];
    readonly keyword: string;
    readonly pages: number;
    readonly page: number;
};

export class OrganizationAddAccount extends React.Component<UserProp, UserState> {

    public readonly state: UserState = {

        users: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public constructor(props: UserProp) {

        super(props);
        this._searchUser = this._searchUser.bind(this);
    }

    public render() {

        return (
            <div>
                <NeonSub onClick={() => this.props.history.goBack()}>Go Back</NeonSub>
                <NeonTitle margin={MARGIN.MEDIUM}>Add account to Organization: {this._getOrganizationName()}</NeonTitle>

                <NeonApplicable
                    size={SIZE.MEDIUM}
                    label={'Search Accounts'}
                    onApply={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchUser)}
                />

                {this.state.users.length === 0
                    ? void 0
                    : <NeonTable
                        headers={['Username', 'Groups', '2FA', 'Email', "Phone", 'Action']}
                        style={{ marginTop: '1rem' }}>
                        {this._renderUser()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, this._searchUser)}
                />
            </div>
        );
    }

    private _renderUser(): JSX.Element[] {

        return this.state.users.map((user: StandaloneAccountResponse) =>
            (<tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.groups}</td>
                <td>{Boolean(user.twoFA).toString()}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                    <NeonButton
                        onClick={() => this._addTo(user.username)}
                        size={SIZE.RELATIVE}>
                        Add To
                    </NeonButton>
                </td>
            </tr>),
        );
    }

    private async _addTo(username: string) {

        const organization: string = this._getOrganizationName();
        const validation: boolean = window.confirm(`Add "${username}" to "${organization}"?`);

        if (validation) {
            await setOrganizationRepository(username, organization);
            this.props.history.push('/user/e/' + username);
        }
    }

    private async _searchUser() {

        const response: FetchStandaloneAccountResponse = await fetchStandaloneAccount(
            this.state.keyword,
            this.state.page,
        );
        this.setState({
            users: response.accounts,
            pages: response.pages,
        });
    }

    private _getOrganizationName(): string {

        const params: any = this.props.match.params;
        return decodeURIComponent(params.organization);
    }
}
