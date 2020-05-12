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
import { NeonSmartList, NeonTable } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { AllDecoratorsResponse, fetchAllDecorators } from "../common/repository/all-decorator";
import { AllGroupsResponse, fetchAllGroups } from "../common/repository/all-group";
import { AllTagsResponse, fetchAllTags } from "../common/repository/all-tag";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { buildAdminAccountMore } from "../util/path";
import { editAccountAdminRepository } from "./repository/admin-edit";
import { singleFetchRepository, SingleFetchResponse, SpecialPasswordResponse } from "./repository/single-fetch";
import { suspendApplicationPasswordRepository } from "./repository/suspend-application-password";
import { suspendTemporaryPasswordRepository } from "./repository/suspend-temp-password";

type AccountEditProp = {
} & RouteComponentProps;

type AccountEditState = {

    readonly loading: boolean;
    readonly cover: any;
    readonly user: SingleFetchResponse | null;
    readonly groups: string[];
    readonly tags: string[];
    readonly decorators: string[];
};

export class AccountEdit extends React.Component<AccountEditProp, AccountEditState> {

    public readonly state: AccountEditState = {

        loading: false,
        cover: undefined,
        user: null,
        groups: [],
        tags: [],
        decorators: [],
    };

    public constructor(props: AccountEditProp) {

        super(props);

        this._submit = this._submit.bind(this);
    }

    public async componentDidMount() {

        const response: SingleFetchResponse = await singleFetchRepository(this._getUsername(), this._getNamespace());
        const groups: AllGroupsResponse[] = await fetchAllGroups();
        const decorators: AllDecoratorsResponse[] = await fetchAllDecorators();
        const tags: AllTagsResponse[] = await fetchAllTags();

        this.setState({
            user: response,
            groups: groups.map((res: AllGroupsResponse) => res.name),
            decorators: decorators.map((res: AllDecoratorsResponse) => res.name),
            tags: tags.map((res: AllTagsResponse) => res.name),
        });
    }

    public render() {

        return (
            <div>
                <GoBack
                    right="More"
                    onClickRight={() => {
                        const username: string = this._getUsername();
                        const namespace: string = this._getNamespace();
                        this.props.history.push(buildAdminAccountMore(username, namespace));
                    }}
                />
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
                    <NamedTitle about="Editing Account">
                        {this.state.user.username}
                    </NamedTitle>
                    <NeonSub>Two-Factor Authorization {this.state.user.twoFA ? "Enabled" : "Disabled"}</NeonSub>
                    <NeonSub>Account {this.state.user.active ? "Active" : "Deactivated"}</NeonSub>
                    {this._renderNamespace()}
                    {this._renderOrganization()}
                    {this._renderDetail()}
                    {this._renderInformation()}
                    {this._renderBeacon()}
                    {this._renderTemporaryPasswords()}
                    {this._renderApplicationPasswords()}
                    {this._renderUserGroup()}
                    {this._renderUserDecorator()}
                    {this._renderUserTag()}
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

    private _renderDetail() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Detail</NeonTitle>
            <NeonSmartList
                list={{
                    ['Display Name']: user.displayName || '',
                    Avatar: user.avatar || '',
                    Email: user.email || '',
                    Phone: user.phone || '',
                }}
                editableValue
                onChange={(newInfo: Record<string, string>) => this.setState({
                    user: {
                        ...user,
                        displayName: newInfo['Display Name'],
                        avatar: newInfo.Avatar,
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

    private _renderTemporaryPasswords() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Temporary Passwords</NeonTitle>
            <NeonTable
                headers={[
                    'ID',
                    'By',
                    'Expire At',
                    'Suspended',
                    'Action',
                ]}
                style={{ marginTop: '1rem' }}>
                {user.temporaryPasswords.map((each: SpecialPasswordResponse) => <tr key={each.id}>
                    <td>{each.id}</td>
                    <td>{each.by}</td>
                    <td>{each.expireAt.toLocaleString()}</td>
                    <td>{each.suspendedAt ? `${each.suspendedAt.toLocaleString()} (${each.suspendedBy})` : 'No'}</td>
                    <td>
                        {each.suspendedAt ? 'None' : <NeonButton
                            className={MenuStyle.actionButton}
                            onClick={() => this._suspendTemporaryPassword(each.id)}
                            style={{ margin: '2px' }}
                            size={SIZE.RELATIVE}>
                            Suspend
                        </NeonButton>}
                    </td>
                </tr>)}
            </NeonTable>
        </React.Fragment>);
    }

    private _renderApplicationPasswords() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Application Passwords</NeonTitle>
            <NeonTable
                headers={[
                    'ID',
                    'By',
                    'Expire At',
                    'Suspended',
                    'Action',
                ]}
                style={{ marginTop: '1rem' }}>
                {user.applicationPasswords.map((each: SpecialPasswordResponse) => <tr key={each.id}>
                    <td>{each.id}</td>
                    <td>{each.by}</td>
                    <td>{each.expireAt.toLocaleString()}</td>
                    <td>{each.suspendedAt ? `${each.suspendedAt.toLocaleString()} (${each.suspendedBy})` : 'No'}</td>
                    <td>
                        {each.suspendedAt ? 'None' : <NeonButton
                            className={MenuStyle.actionButton}
                            onClick={() => this._suspendApplicationPassword(each.id)}
                            style={{ margin: '2px' }}
                            size={SIZE.RELATIVE}>
                            Suspend
                        </NeonButton>}
                    </td>
                </tr>)}
            </NeonTable>
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

    private _renderUserTag() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>User Tag</NeonTitle>
            <NeonPillGroup
                style={{ flexWrap: 'wrap' }}
                selected={user.tags || []}
                onChange={(next: string[]) => {
                    this.setState({
                        user: {
                            ...user,
                            tags: next,
                        },
                    });
                }}
                addable
                removable
                options={this.state.tags}
            />
        </React.Fragment>);
    }

    private _renderSticker() {

        if (!this.state.cover) {
            return null;
        }
        return <NeonSticker {...this.state.cover} />;
    }

    private async _suspendTemporaryPassword(passwordId: string) {

        if (!this.state.user) {
            return;
        }

        this.setState({
            loading: true,
            cover: undefined,
        });

        try {

            await suspendTemporaryPasswordRepository(this.state.user.username, this.state.user.namespace, passwordId);

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

    private async _suspendApplicationPassword(passwordId: string) {

        if (!this.state.user) {
            return;
        }

        this.setState({
            loading: true,
            cover: undefined,
        });

        try {

            await suspendApplicationPasswordRepository(this.state.user.username, this.state.user.namespace, passwordId);

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

    private async _submit() {

        if (!this.state.user) {
            return;
        }

        this.setState({
            loading: true,
            cover: undefined,
        });

        try {

            const account: string = await editAccountAdminRepository(
                this.state.user.username,
                this.state.user.namespace,
                this.state.user.displayName,
                this.state.user.avatar,
                this.state.user.email,
                this.state.user.phone,
                this.state.user.groups,
                this.state.user.tags,
                this.state.user.decorators,
                {
                    infos: this.state.user.infos,
                    beacons: this.state.user.beacons,
                });

            this.setState({
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",
                    info: account,

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

    private _renderNamespace() {

        const user: SingleFetchResponse = this.state.user as SingleFetchResponse;
        if (user.namespace) {
            return (<React.Fragment>
                <NeonTitle size={SIZE.MEDIUM}>Namespace</NeonTitle>
                <NeonSmartList
                    list={{
                        Namespace: <ClickableSpan
                            to={'/admin/namespace/e/' + encodeURIComponent(user.namespace)}
                        >
                            {user.namespace}
                        </ClickableSpan> as any,
                    }}
                />
            </React.Fragment>);
        } else {
            return (<React.Fragment>
                <NeonTitle size={SIZE.MEDIUM}>Namespace</NeonTitle>
                <NeonSub>No Namespace Found</NeonSub>
            </React.Fragment>);
        }
    }

    private _renderOrganization() {

        const user: SingleFetchResponse = this.state.user as SingleFetchResponse;
        if (user.organization) {
            return (<React.Fragment>
                <NeonTitle size={SIZE.MEDIUM}>Organization</NeonTitle>
                <NeonSmartList
                    list={{
                        Name: <ClickableSpan
                            to={'/admin/organization/e/' + encodeURIComponent(user.organization.name)}
                            red={!user.organization.active}
                        >
                            {user.organization.name}
                        </ClickableSpan> as any,
                        Owner: user.organization.owner,
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

    private _getNamespace(): string {

        const params: any = this.props.match.params;
        return params.namespace;
    }
}
