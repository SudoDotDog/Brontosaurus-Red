/**
 * @author WMXPY
 * @namespace User
 * @description Edit
 */

import { _Map } from "@sudoo/bark";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonEditable } from "@sudoo/neon/input";
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
                {this._renderInfos()}
                <NeonTitle size={SIZE.MEDIUM}>Beacon</NeonTitle>
                {JSON.stringify(this.state.user.beacons)}
                <NeonTitle size={SIZE.MEDIUM}>User Group</NeonTitle>
                {JSON.stringify(this.state.user.groups)}

                <NeonButton size={SIZE.MEDIUM} width={WIDTH.FULL}>Save Change</NeonButton>
            </NeonThemeProvider>
        );
    }

    private _renderInfos() {

        if (!this.state.user) {
            return null;
        }

        return _Map.keys(this.state.user.infos).map((key: string) => {

            const user: any = this.state.user;
            const value: string = user.infos[key];

            return (<div
                key={key}
                style={{
                    display: 'flex',
                }}>
                <NeonEditable
                    style={{ flex: 1 }}
                    onChange={(newValue: string) => this._replaceInfoValue(key, newValue, value)}
                    label="Key"
                    value={key}
                />
                <NeonEditable
                    style={{ flex: 4 }}
                    onChange={(newValue: string) => this._replaceInfoValue(key, key, newValue)}
                    label="Value"
                    value={value}
                />
            </div>);
        });
    }

    private _replaceInfoValue(oldKey: string, newKey: string, value: string): void {

        if (!this.state.user) {
            return;
        }
        const info: Record<string, any> = this.state.user.infos;

        const newInfo: Record<string, any> = _Map.keys(info).reduce((previous: Record<string, any>, key: string) => {

            if (key === oldKey) {
                if (oldKey === newKey) {
                    return {
                        ...previous,
                        [key]: value,
                    };
                }

                return {
                    ...previous,
                    [newKey]: value,
                };
            }

            return { ...previous, [key]: info[key] };
        }, {} as Record<string, any>);

        this.setState({
            user: {
                ...this.state.user,
                infos: newInfo,
            },
        });
    }

    private _getUsername(): string {

        const params: any = this.props.match.params;
        return params.username;
    }
}
