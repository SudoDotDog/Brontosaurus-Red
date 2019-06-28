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
import { SearchNew } from "../components/search-new";
import { fetchAccount, UserResponse } from "./repository/account-fetch";

type UserProp = {
} & RouteComponentProps;

type UserState = {

    users: UserResponse[];
};


export class User extends React.Component<UserProp, UserState> {

    public state: UserState = {
        users: [],
    };

    public render() {

        return (
            <div>
                <SearchNew
                    label="Account"
                    onSearch={async (keyword: string) => this.setState({ users: await fetchAccount(keyword) })}
                    onNew={() => this.props.history.push('/user/new')}
                />

                {this.state.users.length === 0
                    ? void 0
                    : <NeonTable
                        headers={['Username', 'Groups', '2FA', 'Email', "Phone", 'Action']}
                        style={{ marginTop: '1rem' }}>
                        {this._renderUser()}
                    </NeonTable>}
            </div>
        );
    }

    private _renderUser(): JSX.Element[] {

        return this.state.users.map((user: UserResponse) =>
            (<tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.groups}</td>
                <td>{Boolean(user.twoFA).toString()}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/user/e/' + user.username)}
                    size={SIZE.RELATIVE}>
                    Edit
                </NeonButton></td>
            </tr>),
        );
    }
}
