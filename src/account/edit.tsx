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
import { AllTagsResponse, fetchAllTags } from "../common/repository/all-tag";
import { ClickableSpan } from "../components/clickable-span";
import { editAccountAdminRepository } from "./repository/admin-edit";
import { singleFetchRepository, SingleFetchResponse } from "./repository/single-fetch";

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

        const response: SingleFetchResponse = await singleFetchRepository(this._getUsername());
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

    private _renderOrganization() {

        const user: any = this.state.user;
        if (user.organization) {
            return (<React.Fragment>
                <NeonTitle size={SIZE.MEDIUM}>Organization</NeonTitle>
                <NeonSmartList
                    list={{
                        Name: <ClickableSpan
                            onClick={() => this.props.history.push('/organization/e/' + encodeURIComponent(user.organization.name))}
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
}
