/**
 * @author WMXPY
 * @namespace User
 * @description Edit
 */

import { MARGIN, SIZE } from "@sudoo/neon/declare";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { singleFetchRepository, SingleFetchResponse } from "./repository/single-fetch";

type UserEditProp = {
} & RouteComponentProps;

type UserEditState = {

    user: SingleFetchResponse | null;
};

export class UserEdit extends React.Component<UserEditProp, UserEditState> {

    public state: UserEditState = {
        user: null,
    };

    public async componentDidMount() {

        const response: SingleFetchResponse = await singleFetchRepository(this._getUsername());

        this.setState({
            user: response,
        });
    }

    public render() {

        return (
            <div>
                <NeonSub onClick={() => this.props.history.goBack()}>Go Back</NeonSub>
                {this._renderEditableInfos()}
            </div>
        );
    }

    private _renderEditableInfos() {

        if (!this.state.user) {
            return null;
        }

        return (
            <NeonThemeProvider value={{
                margin: MARGIN.SMALL,
            }} >
                <NeonTitle>Edit: {this.state.user.username}</NeonTitle>
                <NeonTitle size={SIZE.MEDIUM}>Information</NeonTitle>
                {JSON.stringify(this.state.user.infos)}
                <NeonTitle size={SIZE.MEDIUM}>Beacon</NeonTitle>
                {JSON.stringify(this.state.user.beacons)}
                <NeonTitle size={SIZE.MEDIUM}>User Group</NeonTitle>
                {JSON.stringify(this.state.user.groups)}
            </NeonThemeProvider>
        );
    }

    private _getUsername(): string {

        const params: any = this.props.match.params;
        return params.username;
    }
}
