/**
 * @author WMXPY
 * @namespace Organization
 * @description Add Account
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE } from "@sudoo/neon/declare";
import { NeonSticker } from "@sudoo/neon/flag";
import { NeonApplicable } from "@sudoo/neon/input";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTable } from "@sudoo/neon/table";
import { NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { setOrganizationRepository } from "../account/repository/set-organization";
import { fetchStandaloneAccount, FetchStandaloneAccountResponse, StandaloneAccountResponse } from "../account/repository/standalone-account-fetch";
import { GoBack } from "../components/go-back";
import { PageSelector } from "../components/page-selector";
import { intl } from "../i18n/intl";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";

export type UserState = {

    readonly loading: boolean;
    readonly cover: any;

    readonly users: StandaloneAccountResponse[];
    readonly keyword: string;
    readonly pages: number;
    readonly page: number;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type UserProps = RouteComponentProps & ConnectedStates;

export class OrganizationAddAccountBase extends React.Component<UserProps, UserState> {

    public readonly state: UserState = {

        loading: false,
        cover: undefined,

        users: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

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
                    onApply={(keyword: string) => this.setState({ keyword, page: 0 }, () => {
                        this._searchUser();
                    })}
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
                    onClick={(page: number) => this.setState({ page }, () => {
                        this._searchUser();
                    })}
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

                const response = await setOrganizationRepository(username, namespace, organization);

                this.setState({
                    cover: createSucceedCover(
                        this.props.language,
                        response.account + ' > ' + response.organization,
                        () => this.props.history.goBack(),
                    ),
                });
            } catch (err) {

                this.setState({
                    cover: createFailedCover(
                        this.props.language,
                        err.message,
                        () => this.setState({ cover: undefined }),
                    ),
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

export const OrganizationAddAccount: React.ComponentType = connector.connect(OrganizationAddAccountBase);
