/**
 * @author WMXPY
 * @namespace User
 * @description User
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonApplicable } from "@sudoo/neon/input";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as __User from "../../style/route/user.scss";
import { fetchAccount, UserResponse } from "../repository/account-fetch";

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
                <div className={__User.searchBar}>

                    <NeonApplicable
                        className={__User.search}
                        size={SIZE.MEDIUM}
                        label="Search"
                        onApply={async (keyword: string) => this.setState({ users: await fetchAccount(keyword) })}
                    />

                    <div style={{ width: '0.5rem' }}></div>

                    <NeonButton
                        className={__User.single}
                        size={SIZE.RELATIVE}
                        onClick={() => this.props.history.push('/user/new')}
                    >
                        New
                    </NeonButton>

                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderUser()}
                    </tbody>
                </table>
            </div>

        );
    }

    private _renderUser() {

        console.log(this.state);
        return this.state.users.map((user: UserResponse) =>
            (<tr key={user.username}>
                <td>{user.username}</td>
            </tr>),
        );
    }
}
