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
import { fetchAccount } from "../repository/account-fetch";

type UserProp = {
} & RouteComponentProps;


export class User extends React.Component<UserProp> {

    public render() {

        return (
            <div className={__User.searchBar}>

                <div className={__User.search}>
                    <NeonApplicable
                        size={SIZE.MEDIUM}
                        label="Search"
                        onApply={(keyword: string) => fetchAccount(keyword)}
                    />
                </div>

                <div className={__User.single}>
                    <NeonButton
                        size={SIZE.FULL}
                        onClick={() => this.props.history.push('/user/new')}
                    >
                        New
                </NeonButton>
                </div>

            </div>
        );
    }
}
