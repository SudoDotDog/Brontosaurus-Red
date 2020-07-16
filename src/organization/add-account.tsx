/**
 * @author WMXPY
 * @namespace Organization
 * @description Add Account
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { NeonApplicable } from "@sudoo/neon/input";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTable } from "@sudoo/neon/table";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { setOrganizationRepository } from "../account/repository/set-organization";
import { fetchStandaloneAccount, FetchStandaloneAccountResponse, StandaloneAccountResponse } from "../account/repository/standalone-account-fetch";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { PageSelector } from "../components/page-selector";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";

export type UserState = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;

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

    public componentDidMount() {

        this._searchUser();
    }

    public render() {

        return (
            <NeonIndicator
                loading={this.state.loading}
                covering={Boolean(this.state.cover)}
                cover={this._renderSticker()}
            >
                <GoBack />
                <NamedTitle about={this.props.language.get(
                    PROFILE.ADD_ACCOUNT_TO_INSTANCE,
                    this.props.language.get(PROFILE.ORGANIZATION),
                )}>
                    {this._getOrganizationName()}
                </NamedTitle>
                <NeonApplicable
                    size={SIZE.MEDIUM}
                    apply={this.props.language.get(PROFILE.APPLY)}
                    label={`${this.props.language.get(PROFILE.SEARCH)} ${this.props.language.get(PROFILE.ACCOUNT)}`}
                    onApply={(keyword: string) => this.setState({ keyword, page: 0 }, () => {
                        this._searchUser();
                    })}
                />
                {this.state.users.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            this.props.language.get(PROFILE.NAMESPACE),
                            this.props.language.get(PROFILE.USERNAME),
                            this.props.language.get(PROFILE.GROUPS),
                            this.props.language.get(PROFILE.TWO_FACTOR_AUTHORIZATION),
                            this.props.language.get(PROFILE.EMAIL),
                            this.props.language.get(PROFILE.PHONE),
                            this.props.language.get(PROFILE.ACTION),
                        ]}
                        style={{
                            marginTop: '1rem',
                        }}
                    >
                        {this._renderUser()}
                    </NeonTable>
                }
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
                <td>{user.namespace}</td>
                <td>{user.username}</td>
                <td>{user.groups}</td>
                <td>
                    {Boolean(user.twoFA)
                        ? this.props.language.get(PROFILE.YES)
                        : this.props.language.get(PROFILE.NO)
                    }
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                    <NeonButton
                        onClick={() => this._addTo(user.username, user.namespace)}
                        size={SIZE.RELATIVE}>
                        {this.props.language.get(PROFILE.ADD_TO)}
                    </NeonButton>
                </td>
            </tr>),
        );
    }

    private async _addTo(username: string, namespace: string) {

        const organization: string = this._getOrganizationName();
        const validation: boolean = window.confirm(`Add "${username}" to "${organization}"?`);

        if (!validation) {
            return;
        }

        this.setState({
            loading: true,
            cover: undefined,
        });

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
