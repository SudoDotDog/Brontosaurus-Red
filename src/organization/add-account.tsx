/**
 * @author WMXPY
 * @namespace Organization
 * @description Add Account
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE } from "@sudoo/neon/declare";
import { NeonSticker } from "@sudoo/neon/flag";
import { NeonApplicable } from "@sudoo/neon/input";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTable } from "@sudoo/neon/table";
import { NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { setOrganizationRepository } from "../account/repository/set-organization";
import { fetchStandaloneAccount, FetchStandaloneAccountResponse, StandaloneAccountResponse } from "../account/repository/standalone-account-fetch";
import { GoBack } from "../components/go-back";
import { PageSelector } from "../components/page-selector";
import { buildAdminAccountEdit } from "../util/path";

export type UserProp = {
} & RouteComponentProps;

export type UserState = {

    readonly loading: boolean;
    readonly cover: any;

    readonly users: StandaloneAccountResponse[];
    readonly keyword: string;
    readonly pages: number;
    readonly page: number;
};

export class OrganizationAddAccount extends React.Component<UserProp, UserState> {

    public readonly state: UserState = {

        loading: false,
        cover: undefined,

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
            <NeonIndicator
                loading={this.state.loading}
                covering={Boolean(this.state.cover)}
                cover={this._renderSticker()}
            >
                <GoBack />
                <NeonTitle margin={MARGIN.SMALL}>Add account to Organization: {this._getOrganizationName()}</NeonTitle>

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
            </NeonIndicator>
        );
    }

    private _renderSticker() {

        if (!this.state.cover) {
            return null;
        }
        return <NeonSticker {...this.state.cover} />;
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
                        onClick={() => this._addTo(user.username, user.namespace)}
                        size={SIZE.RELATIVE}>
                        Add To
                    </NeonButton>
                </td>
            </tr>),
        );
    }

    private async _addTo(username: string, namespace: string) {

        const organization: string = this._getOrganizationName();
        const validation: boolean = window.confirm(`Add "${username}" to "${organization}"?`);

        this.setState({
            loading: true,
            cover: undefined,
        });

        if (validation) {
            try {
                const response = await setOrganizationRepository(username, organization);

                this.setState({
                    cover: {
                        type: SIGNAL.SUCCEED,
                        title: "Succeed",
                        info: response.account + ' > ' + response.organization,

                        peek: {
                            children: "<-",
                            expend: "Complete",
                            onClick: () => this.props.history.push(buildAdminAccountEdit(username, namespace)),
                        },
                    },
                });
            } catch (err) {
                this.setState({
                    cover: {
                        type: SIGNAL.ERROR,
                        title: "Failed",
                        info: err.message,

                        peek: {
                            children: "<-",
                            expend: "Retry",
                            onClick: () => this.setState({ cover: undefined }),
                        },
                    },
                });
            } finally {

                this.setState({
                    loading: false,
                });
            }
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
