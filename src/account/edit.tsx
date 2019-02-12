/**
 * @author WMXPY
 * @namespace Account
 * @description Edit
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonSmartList } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { editAccountAdminRepository } from "./repository/admin-edit";
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
                <NeonSmartList
                    list={this.state.user.infos}
                    editableName
                    editableValue
                    onChange={(newInfo) => this.setState({
                        user: {
                            ...this.state.user as any,
                            infos: newInfo,
                        },
                    })} />
                <NeonTitle size={SIZE.MEDIUM}>Beacon</NeonTitle>

                <NeonSmartList
                    list={this.state.user.beacons}
                    editableValue
                    onChange={(newBeacon) => this.setState({
                        user: {
                            ...this.state.user as any,
                            beacons: newBeacon,
                        },
                    })} />
                <NeonTitle size={SIZE.MEDIUM}>User Group</NeonTitle>

                <NeonPillGroup
                    selected={this.state.user.groups}
                />

                <NeonButton
                    size={SIZE.MEDIUM}
                    width={WIDTH.FULL}
                    onClick={() => this.state.user && editAccountAdminRepository(this.state.user.username, {
                        infos: this.state.user.infos,
                        beacons: this.state.user.beacons,
                    })}
                >
                    Save Change
                </NeonButton>
            </NeonThemeProvider>
        );
    }

    private _getUsername(): string {

        const params: any = this.props.match.params;
        return params.username;
    }
}
