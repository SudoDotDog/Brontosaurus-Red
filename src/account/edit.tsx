/**
 * @author WMXPY
 * @namespace Account
 * @description Edit
 */

import { NeonButton, NeonCoin } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonSmartList } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { fetchGroup, GroupResponse } from "../group/repository/group-fetch";
import { editAccountAdminRepository } from "./repository/admin-edit";
import { deactivateAccount } from "./repository/deactivate";
import { limboAccount, LimboAccountResponse } from "./repository/limbo";
import { singleFetchRepository, SingleFetchResponse } from "./repository/single-fetch";
import { removeTwoFAAccount } from "./repository/twoFARemove";

type UserEditProp = {
} & RouteComponentProps;

type UserEditState = {

    user: SingleFetchResponse | null;
    groups: string[];
};

export class UserEdit extends React.Component<UserEditProp, UserEditState> {

    public state: UserEditState = {
        user: null,
        groups: [],
    };

    public constructor(props: UserEditProp) {

        super(props);

        this._deactivateUser = this._deactivateUser.bind(this);
        this._limboUser = this._limboUser.bind(this);
        this._twoFARemoveUser = this._twoFARemoveUser.bind(this);
    }

    public async componentDidMount() {

        const response: SingleFetchResponse = await singleFetchRepository(this._getUsername());
        const groups: GroupResponse[] = await fetchGroup();

        this.setState({
            user: response,
            groups: groups.map((res: GroupResponse) => res.name),
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
                <NeonSub>Two-Way Authorization {this.state.user.twoFA ? "Enabled" : "Disabled"}</NeonSub>
                <NeonTitle size={SIZE.MEDIUM}>Organization</NeonTitle>
                {this._renderOrganization()}
                <NeonTitle size={SIZE.MEDIUM}>Contact</NeonTitle>
                <NeonSmartList
                    list={{
                        Email: this.state.user.email || '',
                        Phone: this.state.user.phone || '',
                    }}
                    editableValue
                    onChange={(newInfo: Record<string, string>) => this.setState({
                        user: {
                            ...this.state.user as SingleFetchResponse,
                            email: newInfo.Email,
                            phone: newInfo.Phone,
                        },
                    })}
                />
                <NeonTitle size={SIZE.MEDIUM}>Information</NeonTitle>
                <NeonSmartList
                    list={this.state.user.infos}
                    editableName
                    editableValue
                    onChange={(newInfo: Record<string, string>) => this.setState({
                        user: {
                            ...this.state.user as any,
                            infos: newInfo,
                        },
                    })}
                />
                <NeonCoin
                    size={SIZE.NORMAL}
                    onClick={() => {
                        const user: any = this.state.user;
                        this.setState({
                            user: {
                                ...user as any,
                                infos: {
                                    ...user.infos as any,
                                    "NEW-INFO": "1",
                                },
                            },
                        });
                    }}
                >+</NeonCoin>
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
                    style={{ flexWrap: 'wrap' }}
                    selected={this.state.user.groups}
                    onChange={(next: string[]) => {
                        this.setState({
                            user: {
                                ...this.state.user as SingleFetchResponse,
                                groups: next,
                            },
                        });
                    }}
                    addable
                    removable
                    options={this.state.groups}
                />

                <NeonTitle size={SIZE.MEDIUM}>Dangerous</NeonTitle>
                <div style={{ display: 'flex' }}>
                    <NeonButton
                        onClick={this._deactivateUser}
                        size={SIZE.MEDIUM}
                    >Deactivate</NeonButton>
                    <NeonButton
                        onClick={this._limboUser}
                        size={SIZE.MEDIUM}
                    >Reset</NeonButton>
                    <NeonButton
                        onClick={this._twoFARemoveUser}
                        size={SIZE.MEDIUM}
                    >2FA Remove</NeonButton>
                </div>

                <NeonButton
                    size={SIZE.MEDIUM}
                    width={WIDTH.FULL}
                    onClick={() => this.state.user && editAccountAdminRepository(
                        this.state.user.username,
                        this.state.user.email,
                        this.state.user.phone,
                        this.state.user.groups,
                        {
                            infos: this.state.user.infos,
                            beacons: this.state.user.beacons,
                        })}
                >
                    Save Change
                </NeonButton>
            </NeonThemeProvider>
        );
    }

    private async _deactivateUser() {

        if (!this.state.user) {
            return;
        }
        const isConfirm: boolean = window.confirm(`Are you sure to deactivate ${this.state.user.username}?`);
        if (isConfirm) {
            await deactivateAccount(this.state.user.username);
            this.props.history.goBack();
        }
    }

    private async _limboUser() {

        if (!this.state.user) {
            return;
        }
        const isConfirm: boolean = window.confirm(`Are you sure to reset ${this.state.user.username}'s password?`);
        if (isConfirm) {
            const response: LimboAccountResponse = await limboAccount(this.state.user.username);
            window.alert(`${this.state.user.username}'s temp new password is ${response.tempPassword}`);
        }
    }

    private async _twoFARemoveUser() {

        if (!this.state.user) {
            return;
        }
        const isConfirm: boolean = window.confirm(`Are you sure to remove ${this.state.user.username}'s Two-Way authenticator?`);
        if (isConfirm) {
            await removeTwoFAAccount(this.state.user.username);
        }
    }

    private _renderOrganization() {

        const user: any = this.state.user;
        if (user.organization) {
            return (<NeonSmartList
                list={{
                    name: user.organization.name,
                    owner: user.organization.owner,
                }}
            />);
        } else {
            return (<NeonSub>This user doesn't belong to any organization</NeonSub>);
        }
    }

    private _getUsername(): string {

        const params: any = this.props.match.params;
        return params.username;
    }
}
