/**
 * @author WMXPY
 * @namespace Account
 * @description Edit
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton, NeonCoin } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSmartList, NeonTable } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { AllDecoratorsResponse, fetchAllDecorators } from "../common/repository/all-decorator";
import { AllGroupsResponse, fetchAllGroups } from "../common/repository/all-group";
import { AllTagsResponse, fetchAllTags } from "../common/repository/all-tag";
import { ActiveStatus } from "../components/active-status";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { LiteStatus } from "../components/lite-status";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { buildAdminAccountMore, buildAdminDecoratorEdit, buildAdminGroupEdit, buildAdminTagEdit } from "../util/path";
import { AccountPreviousPasswords } from "./components/previous-passwords";
import { editAccountAdminRepository } from "./repository/admin-edit";
import { singleFetchRepository, SingleFetchResponse, SpecialPasswordResponse } from "./repository/single-fetch";
import { suspendApplicationPasswordRepository, SuspendApplicationPasswordResponse } from "./repository/suspend-application-password";
import { suspendTemporaryPasswordRepository, SuspendTemporaryPasswordResponse } from "./repository/suspend-temp-password";

type AccountEditState = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly user: SingleFetchResponse | null;
    readonly groups: string[];
    readonly tags: string[];
    readonly decorators: string[];
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type AccountEditProp = RouteComponentProps & ConnectedStates;

export class AccountEditBase extends React.Component<AccountEditProp, AccountEditState> {

    public readonly state: AccountEditState = {

        loading: false,
        cover: undefined,
        user: null,
        groups: [],
        tags: [],
        decorators: [],
    };

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
                    right={this.props.language.get(PROFILE.MORE)}
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

        const language: SudooFormat = this.props.language;
        return (
            <NeonThemeProvider value={{
                margin: MARGIN.SMALL,
            }} >
                <NeonIndicator
                    loading={this.state.loading}
                    covering={Boolean(this.state.cover)}
                    cover={this._renderSticker()}
                >
                    <NamedTitle about={language.get(
                        PROFILE.EDITING,
                        language.get(PROFILE.ACCOUNT),
                    )}>
                        {this.state.user.username}
                    </NamedTitle>
                    <ActiveStatus
                        active={this.state.user.active}
                    >
                        <LiteStatus
                            active={this.state.user.twoFA}
                            activeText={language.get(PROFILE.TWO_FACTOR_ENABLED_BADGE)}
                            inactiveText={language.get(PROFILE.TWO_FACTOR_DISABLED_BADGE)}
                        />
                    </ActiveStatus>
                    {this._renderNamespace()}
                    {this._renderOrganization()}
                    {this._renderDetail()}
                    {this._renderInformation()}
                    {this._renderBeacon()}
                    {this._renderPreviousPasswords()}
                    {this._renderTemporaryPasswords()}
                    {this._renderApplicationPasswords()}
                    {this._renderUserGroup()}
                    {this._renderUserDecorator()}
                    {this._renderUserTag()}
                    <NeonButton
                        size={SIZE.MEDIUM}
                        width={WIDTH.FULL}
                        onClick={this._submit.bind(this)}>
                        {language.get(PROFILE.SAVE_CHANGE)}
                    </NeonButton>
                </NeonIndicator>
            </NeonThemeProvider>
        );
    }

    private _renderDetail() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.DETAIL)}
            </NeonTitle>
            <NeonSmartList
                name={this.props.language.get(PROFILE.KEY)}
                value={this.props.language.get(PROFILE.VALUE)}
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
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.INFORMATION)}
            </NeonTitle>
            <NeonSmartList
                name={this.props.language.get(PROFILE.KEY)}
                value={this.props.language.get(PROFILE.VALUE)}
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
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.BEACON)}
            </NeonTitle>
            <NeonSmartList
                name={this.props.language.get(PROFILE.KEY)}
                value={this.props.language.get(PROFILE.VALUE)}
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
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.TEMPORARY_PASSWORD)}
            </NeonTitle>
            <NeonTable
                headers={[
                    this.props.language.get(PROFILE.ID),
                    this.props.language.get(PROFILE.BY),
                    this.props.language.get(PROFILE.EXPIRE_AT),
                    this.props.language.get(PROFILE.SUSPENDED),
                    this.props.language.get(PROFILE.ACTION),
                ]}
                style={{ marginTop: '1rem' }}>
                {user.temporaryPasswords.map((each: SpecialPasswordResponse) => <tr key={each.id}>
                    <td>{each.id}</td>
                    <td>{each.by}</td>
                    <td>{each.expireAt.toLocaleString()}</td>
                    <td>{each.suspendedAt ? `${each.suspendedAt.toLocaleString()} (${each.suspendedBy})` : 'No'}</td>
                    <td>
                        {each.suspendedAt ? 'None' : <NeonButton
                            className={MenuStyle["action-button"]}
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
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.APPLICATION_PASSWORD)}
            </NeonTitle>
            <NeonTable
                headers={[
                    this.props.language.get(PROFILE.ID),
                    this.props.language.get(PROFILE.BY),
                    this.props.language.get(PROFILE.EXPIRE_AT),
                    this.props.language.get(PROFILE.SUSPENDED),
                    this.props.language.get(PROFILE.ACTION),
                ]}
                style={{ marginTop: '1rem' }}>
                {user.applicationPasswords.map((each: SpecialPasswordResponse) => <tr key={each.id}>
                    <td>{each.id}</td>
                    <td>{each.by}</td>
                    <td>{each.expireAt.toLocaleString()}</td>
                    <td>{each.suspendedAt ? `${each.suspendedAt.toLocaleString()} (${each.suspendedBy})` : 'No'}</td>
                    <td>
                        {each.suspendedAt ? 'None' : <NeonButton
                            className={MenuStyle["action-button"]}
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

    private _renderPreviousPasswords() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.PREVIOUS_PASSWORD)}
            </NeonTitle>
            <AccountPreviousPasswords
                username={user.username}
                namespace={user.namespace}
                previousPasswordsCount={user.previousPasswordsCount}
            />
        </React.Fragment>);
    }

    private _renderUserGroup() {

        const user = this.state.user as SingleFetchResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.GROUPS)}
            </NeonTitle>
            <NeonPillGroup
                addText={this.props.language.get(PROFILE.ADD_INDICATOR)}
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
                render={(value: string) => {
                    return (<ClickableSpan
                        to={buildAdminGroupEdit(value)}
                    >
                        {value}
                    </ClickableSpan>);
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
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.DECORATORS)}
            </NeonTitle>
            <NeonPillGroup
                addText={this.props.language.get(PROFILE.ADD_INDICATOR)}
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
                render={(value: string) => {
                    return (<ClickableSpan
                        to={buildAdminDecoratorEdit(value)}
                    >
                        {value}
                    </ClickableSpan>);
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
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.TAGS)}
            </NeonTitle>
            <NeonPillGroup
                addText={this.props.language.get(PROFILE.ADD_INDICATOR)}
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
                render={(value: string) => {
                    return (<ClickableSpan
                        to={buildAdminTagEdit(value)}
                    >
                        {value}
                    </ClickableSpan>);
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

            const response: SuspendTemporaryPasswordResponse = await suspendTemporaryPasswordRepository(this.state.user.username, this.state.user.namespace, passwordId);

            this.setState({
                cover: createSucceedCover(
                    this.props.language,
                    response.username,
                    () => this.props.history.goBack(),
                ),
            });
        } catch (err) {

            this.setState({
                cover: createFailedCover(
                    this.props.language,
                    err.message,
                    () => this.setState({ cover: undefined }),
                ),
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

            const application: SuspendApplicationPasswordResponse = await suspendApplicationPasswordRepository(this.state.user.username, this.state.user.namespace, passwordId);

            this.setState({
                cover: createSucceedCover(
                    this.props.language,
                    application.username,
                    () => this.props.history.goBack(),
                ),
            });
        } catch (err) {

            this.setState({
                cover: createFailedCover(
                    this.props.language,
                    err.message,
                    () => this.setState({ cover: undefined }),
                ),
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
                cover: createSucceedCover(
                    this.props.language,
                    account,
                    () => this.props.history.goBack(),
                ),
            });
        } catch (err) {

            this.setState({
                cover: createFailedCover(
                    this.props.language,
                    err.message,
                    () => this.setState({ cover: undefined }),
                ),
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
                <NeonTitle size={SIZE.MEDIUM}>
                    {this.props.language.get(PROFILE.NAMESPACE)}
                </NeonTitle>
                <NeonSmartList
                    name={this.props.language.get(PROFILE.KEY)}
                    value={this.props.language.get(PROFILE.VALUE)}
                    list={{
                        Namespace: (<ClickableSpan
                            to={'/admin/namespace/e/' + encodeURIComponent(user.namespace)}
                        >
                            {user.namespace}
                        </ClickableSpan> as any),
                    }}
                />
            </React.Fragment>);
        } else {
            return (<React.Fragment>
                <NeonTitle size={SIZE.MEDIUM}>
                    {this.props.language.get(PROFILE.NAMESPACE)}
                </NeonTitle>
                <NeonSub>No Namespace Found</NeonSub>
            </React.Fragment>);
        }
    }

    private _renderOrganization() {

        const user: SingleFetchResponse = this.state.user as SingleFetchResponse;
        if (user.organization) {
            return (<React.Fragment>
                <NeonTitle size={SIZE.MEDIUM}>
                    {this.props.language.get(PROFILE.ORGANIZATION)}
                </NeonTitle>
                <NeonSmartList
                    name={this.props.language.get(PROFILE.KEY)}
                    value={this.props.language.get(PROFILE.VALUE)}
                    list={{
                        Name: (<ClickableSpan
                            to={'/admin/organization/e/' + encodeURIComponent(user.organization.name)}
                            red={!user.organization.active}
                        >
                            {user.organization.name}
                        </ClickableSpan> as any),
                        Owner: user.organization.owner,
                    }}
                />
            </React.Fragment>);
        } else {
            return (<React.Fragment>
                <NeonTitle
                    size={SIZE.MEDIUM}
                >
                    {this.props.language.get(PROFILE.ORGANIZATION)}
                </NeonTitle>
                <NeonSub>
                    {this.props.language.get(PROFILE.NO_ORGANIZATION_DESCRIPTION)}
                </NeonSub>
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

export const AccountEdit: React.ComponentType = connector.connect(AccountEditBase);
