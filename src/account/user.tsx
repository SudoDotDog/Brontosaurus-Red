/**
 * @author WMXPY
 * @namespace Account
 * @description User
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonTable } from "@sudoo/neon/table";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { ClickableSpan } from "../components/clickable-span";
import { PageSelector } from "../components/page-selector";
import { SearchNew } from "../components/search-new";
import { fetchAccount, FetchAccountResponse, UserResponse } from "./repository/account-fetch";

export type UserProp = {
} & RouteComponentProps;

export type UserState = {

    readonly users: UserResponse[];
    readonly keyword: string;
    readonly pages: number;
    readonly page: number;
};

export class User extends React.Component<UserProp, UserState> {

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
                <SearchNew
                    label="Account"
                    onSearch={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchUser)}
                    onNew={() => this.props.history.push('/admin/user/new')}
                />

                {this.state.users.length === 0
                    ? void 0
                    : <NeonTable
                        headers={['Username', 'Display', 'Groups', 'Decorators', 'Tags', '2FA', 'Email', "Phone", 'Action']}
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

        return this.state.users.map((user: UserResponse) =>
            (<tr key={user.username}>
                <td>
                    <ClickableSpan to={'/admin/user/e/' + encodeURIComponent(user.username)}>
                        {user.username}
                    </ClickableSpan>
                </td>
                <td>{user.displayName}</td>
                <td>{user.groups}</td>
                <td>{user.decorators}</td>
                <td>{user.tags}</td>
                <td>{Boolean(user.twoFA).toString()}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className={MenuStyle.actionRaw}>
                    <NeonButton
                        className={MenuStyle.actionButton}
                        onClick={() => this.props.history.push('/admin/user/more/' + encodeURIComponent(user.username))}
                        size={SIZE.RELATIVE}>
                        More
                    </NeonButton>
                </td>
            </tr>),
        );
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
