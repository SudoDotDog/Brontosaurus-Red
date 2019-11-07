/**
 * @author WMXPY
 * @namespace Account
 * @description User
 */

import { SudooFormat } from "@sudoo/internationalization/dist/format";
import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonTable } from "@sudoo/neon/table";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { ClickableSpan } from "../components/clickable-span";
import { PageSelector } from "../components/page-selector";
import { SearchNew } from "../components/search-new";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { fetchAccount, FetchAccountResponse, UserResponse } from "./repository/account-fetch";

export type UserState = {

    readonly users: UserResponse[];
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

export class UserBase extends React.Component<ConnectedProps, UserState> {

    public readonly state: UserState = {

        users: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public constructor(props: ConnectedProps) {

        super(props);

        this._searchUser = this._searchUser.bind(this);
    }

    public render() {

        return (
            <div>
                <SearchNew
                    label="Account"
                    onSearch={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchUser)}
                    onNew={() => this.props.history.push('/admin/user/new')}
                />

                {this.state.users.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            this.props.language.get(PROFILE.USERNAME),
                            this.props.language.get(PROFILE.DISPLAY_NAME),
                            this.props.language.get(PROFILE.GROUPS),
                            this.props.language.get(PROFILE.DECORATORS),
                            this.props.language.get(PROFILE.TAGS),
                            this.props.language.get(PROFILE.TWO_FACTOR_AUTHORIZATION_LITE),
                            this.props.language.get(PROFILE.EMAIL),
                            this.props.language.get(PROFILE.PHONE),
                            this.props.language.get(PROFILE.ACTION),
                        ]}
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

        return this.state.users.map((user: UserResponse) => {

            const twoFA: string = this.props.language.get(
                Boolean(user.twoFA) ? PROFILE.YES : PROFILE.NO,
            );

            return (<tr key={user.username}>
                <td>
                    <ClickableSpan
                        to={'/admin/user/e/' + encodeURIComponent(user.username)}
                        red={!user.active}
                    >
                        {user.username}
                    </ClickableSpan>
                </td>
                <td>{user.displayName}</td>
                <td>{user.groups}</td>
                <td>{user.decorators}</td>
                <td>{user.tags}</td>
                <td>{twoFA}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className={MenuStyle.actionRaw}>
                    <NeonButton
                        className={MenuStyle.actionButton}
                        onClick={() => this.props.history.push('/admin/user/more/' + encodeURIComponent(user.username))}
                        size={SIZE.RELATIVE}>
                        {this.props.language.get(PROFILE.MORE)}
                    </NeonButton>
                </td>
            </tr>);
        });
    }

    private async _searchUser() {

        const response: FetchAccountResponse = await fetchAccount(
            this.state.keyword,
            this.state.page,
        );
        this.setState({
            users: response.accounts,
            pages: response.pages,
        });
    }
}

export const User: React.ComponentType<{}> = connector.connect(UserBase);
