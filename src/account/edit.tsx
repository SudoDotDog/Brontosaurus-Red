/**
 * @author WMXPY
 * @namespace Account
 * @description Edit
 */

import { NeonButton, NeonCoin } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker } from "@sudoo/neon/flag";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSmartList } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AllDecoratorsResponse, fetchAllDecorators } from "../common/repository/all-decorator";
import { AllGroupsResponse, fetchAllGroups } from "../common/repository/all-group";
import { editAccountAdminRepository } from "./repository/admin-edit";
import { deactivateAccount } from "./repository/deactivate";
import { limboAccount, LimboAccountResponse } from "./repository/limbo";
import { resetAttemptAccount } from "./repository/reset-attempt";
import { singleFetchRepository, SingleFetchResponse } from "./repository/single-fetch";
import { removeTwoFAAccount } from "./repository/twoFARemove";

type UserEditProp = {
} & RouteComponentProps;

type UserEditState = {

    readonly loading: boolean;
    readonly cover: any;
    readonly user: SingleFetchResponse | null;
    readonly groups: string[];
    readonly decorators: string[];
};

export class UserEdit extends React.Component<UserEditProp, UserEditState> {

    public readonly state: UserEditState = {

        loading: false,
        cover: undefined,
        user: null,
        groups: [],
        decorators: [],
    };

    public constructor(props: UserEditProp) {

        super(props);

        this._submit = this._submit.bind(this);
        this._deactivateUser = this._deactivateUser.bind(this);
        this._limboUser = this._limboUser.bind(this);
        this._twoFARemoveUser = this._twoFARemoveUser.bind(this);
        this._resetAttemptUser = this._resetAttemptUser.bind(this);
    }

    public async componentDidMount() {

        const response: SingleFetchResponse = await singleFetchRepository(this._getUsername());
        const groups: AllGroupsResponse[] = await fetchAllGroups();
        const decorators: AllDecoratorsResponse[] = await fetchAllDecorators();

        this.setState({
            user: response,
            groups: groups.map((res: AllGroupsResponse) => res.name),
            decorators: decorators.map((res: AllDecoratorsResponse) => res.name),
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
                <NeonIndicator
                    loading={this.state.loading}
                    covering={Boolean(this.state.cover)}
                    cover={this._renderSticker()}
                >
                    <NeonTitle>Edit: {this.state.user.username}</NeonTitle>
                    <NeonSub>Two-Factor Authorization {this.state.user.twoFA ? "Enabled" : "Disabled"}</NeonSub>
                    {this._renderOrganization()}
                    {this._renderContact()}
                    {this._renderInformation()}
                    {this._renderBeacon()}
                    {this._renderUserGroup()}
                    {this._renderUserDecorator()}
                    {this._renderDangerous()}
                    <NeonButton
                        size={SIZE.MEDIUM}
                        width={WIDTH.FULL}
                        onClick={this._submit}>
                        Save Change
                    </NeonButton>
                </NeonIndicator>
            </NeonThemeProvider>
        );
    }

    private _renderContact() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Contact</NeonTitle>
            <NeonSmartList
                list={{
                    Email: user.email || '',
                    Phone: user.phone || '',
                }}
                editableValue
                onChange={(newInfo: Record<string, string>) => this.setState({
                    user: {
                        ...user,
                        email: newInfo.Email,
                        phone: newInfo.Phone,
                    },
                })}
            />
        </React.Fragment>);
    }

    private _renderInformation() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Information</NeonTitle>
            <NeonSmartList
                list={user.infos}
                editableName
                editableValue
                onChange={(newInfo: Record<string, string>) => this.setState({
                    user: {
                        ...user,
                        infos: newInfo,
                    },
                })}
            />
            <NeonCoin
                size={SIZE.NORMAL}
                onClick={() => {
                    this.setState({
                        user: {
                            ...user,
                            infos: {
                                ...user.infos,
                                "NEW-INFO": "1",
                            },
                        },
                    });
                }}
            >+</NeonCoin>
        </React.Fragment>);
    }

    private _renderBeacon() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Beacon</NeonTitle>
            <NeonSmartList
                list={user.beacons}
                editableValue
                onChange={(newBeacon) => this.setState({
                    user: {
                        ...user,
                        beacons: newBeacon,
                    },
                })} />
        </React.Fragment>);
    }

    private _renderUserGroup() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>User Group</NeonTitle>
            <NeonPillGroup
                style={{ flexWrap: 'wrap' }}
                selected={user.groups || []}
                onChange={(next: string[]) => {
                    this.setState({
                        user: {
                            ...user,
                            groups: next,
                        },
                    });
                }}
                addable
                removable
                options={this.state.groups}
            />
        </React.Fragment>);
    }

    private _renderUserDecorator() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>User Decorator</NeonTitle>
            <NeonPillGroup
                style={{ flexWrap: 'wrap' }}
                selected={user.decorators || []}
                onChange={(next: string[]) => {
                    this.setState({
                        user: {
                            ...user,
                            decorators: next,
                        },
                    });
                }}
                addable
                removable
                options={this.state.decorators}
            />
        </React.Fragment>);
    }

    private _renderDangerous() {

        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Dangerous</NeonTitle>
            <div style={{ display: 'flex', margin: '0.5rem' }}>
                <NeonButton
                    onClick={this._deactivateUser}
                    margin={MARGIN.NONE}
                    size={SIZE.MEDIUM}
                >Deactivate</NeonButton>
                <NeonButton
                    onClick={this._limboUser}
                    margin={MARGIN.NONE}
                    size={SIZE.MEDIUM}
                >Limbo</NeonButton>
                <NeonButton
                    onClick={this._twoFARemoveUser}
                    margin={MARGIN.NONE}
                    size={SIZE.MEDIUM}
                >2FA Remove</NeonButton>
                <NeonButton
                    onClick={this._resetAttemptUser}
                    margin={MARGIN.NONE}
                    size={SIZE.MEDIUM}
                >Recover</NeonButton>
            </div>
        </React.Fragment>);
    }

    private _renderSticker() {

        if (!this.state.cover) {
            return null;
        }
        return <NeonSticker {...this.state.cover} />;
    }

    private async _submit() {

        if (!this.state.user) {
            return;
        }

        this.setState({
            loading: true,
            cover: undefined,
        });

        try {

            await editAccountAdminRepository(
                this.state.user.username,
                this.state.user.email,
                this.state.user.phone,
                this.state.user.groups,
                this.state.user.decorators,
                {
                    infos: this.state.user.infos,
                    beacons: this.state.user.beacons,
                });

            this.setState({
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",

                    peek: {
                        children: "<-",
                        expend: "Complete",
                        onClick: this.props.history.goBack,
                    },
                },
            });
        } catch (err) {

            this.setState({
                cover: {
                    type: SIGNAL.ERROR,
                    title: "Failed",
                    info: err.message,

                    peek: {
                        children: "<-",
                        expend: "Retry",
                        onClick: () => this.setState({ cover: undefined }),
                    },
                },
            });
        } finally {

            this.setState({
                loading: false,
            });
        }
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
        const isConfirm: boolean = window.confirm(`Are you sure to remove ${this.state.user.username}'s Two-Factor authenticator?`);
        if (isConfirm) {
            await removeTwoFAAccount(this.state.user.username);
        }
    }

    private async _resetAttemptUser() {

        if (!this.state.user) {
            return;
        }
        const isConfirm: boolean = window.confirm(`Are you sure to reset ${this.state.user.username}'s Sign-in attempt count?`);
        if (isConfirm) {
            await resetAttemptAccount(this.state.user.username);
        }
    }

    private _renderOrganization() {

        const user: any = this.state.user;
        if (user.organization) {
            return (<React.Fragment>
                <NeonTitle size={SIZE.MEDIUM}>Organization</NeonTitle>
                <NeonSmartList
                    list={{
                        name: user.organization.name,
                        owner: user.organization.owner,
                    }}
                />
            </React.Fragment>);
        } else {
            return (<React.Fragment>
                <NeonTitle size={SIZE.MEDIUM}>Organization</NeonTitle>
                <NeonSub>This user doesn't belong to any organization</NeonSub>
            </React.Fragment>);
        }
    }

    private _getUsername(): string {

        const params: any = this.props.match.params;
        return params.username;
    }
}
