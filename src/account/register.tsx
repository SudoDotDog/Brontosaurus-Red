/**
 * @author WMXPY
 * @namespace Account
 * @description Register
 */

import { DEFAULT_BRONTOSAURUS_NAMESPACE } from "@brontosaurus/definition";
import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AllGroupsResponse, fetchAllGroups } from "../common/repository/all-group";
import { AllTagsResponse, fetchAllTags } from "../common/repository/all-tag";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { buildAdminGroupEdit, buildAdminTagEdit } from "../util/path";
import { TitleManager } from "../util/title";
import { registerRepository } from "./repository/register";
import { registerInfo, RegisterInfoElement } from "./repository/register-infos";

export type RegisterState = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;

    readonly infos: Array<{
        name: string;
        type: string;
    }>;
    readonly current: any;

    readonly tags: string[];
    readonly selectedTags: string[];
    readonly groups: string[];
    readonly selectedGroups: string[];
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type RegisterProps = RouteComponentProps & ConnectedStates;

export class RegisterBase extends React.Component<RegisterProps, RegisterState> {

    public readonly state: RegisterState = {

        loading: false,
        cover: undefined,

        tags: [],
        selectedTags: [],
        groups: [],
        selectedGroups: [],

        current: {
            namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT,
        },
        infos: [],
    };

    public async componentDidMount() {

        TitleManager.setNestedPage(PROFILE.ACCOUNT, PROFILE.REGISTER);
        const infos: RegisterInfoElement[] = await registerInfo();

        this._fetchTags();
        this._fetchGroups();

        this.setState({
            infos: infos.map((info: RegisterInfoElement) => ({
                name: info.name,
                type: info.type,
            })),
        });
    }

    public componentWillUnmount(): void {

        TitleManager.restore();
    }

    public render() {

        return (<React.Fragment>
            <GoBack />
            <NeonIndicator
                loading={this.state.loading}
                covering={Boolean(this.state.cover)}
                cover={this._renderSticker()}
            >
                <NeonTitle>
                    {this.props.language.get(PROFILE.REGISTER_ACCOUNT)}
                </NeonTitle>
                <NeonSub margin={MARGIN.SMALL}>
                    {this.props.language.get(PROFILE.INFORMATION)}
                </NeonSub>
                <NeonSmartForm
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                />
                <NeonSub margin={MARGIN.SMALL}>
                    {this.props.language.get(PROFILE.TAGS)}
                </NeonSub>
                <NeonPillGroup
                    addText={this.props.language.get(PROFILE.ADD_INDICATOR)}
                    margin={MARGIN.SMALL}
                    style={{ flexWrap: 'wrap' }}
                    selected={this.state.selectedTags}
                    onChange={(next: string[]) => this.setState({ selectedTags: next })}
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
                <NeonSub margin={MARGIN.SMALL}>
                    {this.props.language.get(PROFILE.GROUPS)}
                </NeonSub>
                <NeonPillGroup
                    addText={this.props.language.get(PROFILE.ADD_INDICATOR)}
                    margin={MARGIN.SMALL}
                    style={{ flexWrap: 'wrap' }}
                    selected={this.state.selectedGroups}
                    onChange={(next: string[]) => this.setState({ selectedGroups: next })}
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
                <NeonButton
                    onClick={() => this._submit(this.state.current)}
                    width={WIDTH.FULL}
                    size={SIZE.MEDIUM}
                    margin={MARGIN.SMALL}>
                    {this.props.language.get(PROFILE.SUBMIT)}
                </NeonButton>
            </NeonIndicator>
        </React.Fragment>);
    }

    private _getForm(): Record<string, INPUT_TYPE | FromElement> {

        return {
            username: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.USERNAME),
            },
            namespace: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.NAMESPACE),
            },
            displayName: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.DISPLAY_NAME),
            },
            password: {
                type: INPUT_TYPE.PASSWORD,
                display: this.props.language.get(PROFILE.PASSWORD),
            },
            email: {
                type: INPUT_TYPE.EMAIL,
                display: this.props.language.get(PROFILE.EMAIL),
            },
            phone: {
                type: INPUT_TYPE.NUMBER,
                display: this.props.language.get(PROFILE.PHONE),
            },
            ...this.state.infos.reduce((previous: Record<string, INPUT_TYPE>, current: {
                name: string;
                type: string;
            }) => {

                return {
                    ...previous,
                    [current.name]: INPUT_TYPE.TEXT,
                };
            }, {}),
        };
    }

    private _renderSticker() {

        if (!this.state.cover) {
            return null;
        }
        return <NeonSticker {...this.state.cover} />;
    }

    private async _fetchTags() {

        const tags: AllTagsResponse[] = await fetchAllTags();
        this.setState({
            tags: tags.map((res: AllTagsResponse) => res.name),
        });
    }

    private async _fetchGroups() {

        const groups: AllGroupsResponse[] = await fetchAllGroups();
        this.setState({
            groups: groups.map((res: AllTagsResponse) => res.name),
        });
    }

    private async _submit(response: Record<string, any>) {

        this.setState({
            loading: true,
        });

        const parsed: Record<string, string> = this.state.infos.reduce((previous: Record<string, string>, current: RegisterInfoElement) => {

            return {
                ...previous,
                [current.name]: response[current.name] || '',
            };
        }, {} as Record<string, string>);

        if (!response.username) {

            alert('username required');
            this.setState({
                loading: false,
            });
            return;
        }

        if (!response.namespace) {

            alert('namespace required');
            this.setState({
                loading: false,
            });
            return;
        }

        if (!response.password) {

            alert('password required');
            this.setState({
                loading: false,
            });
            return;
        }

        try {

            const id: string = await registerRepository(
                response.username,
                response.namespace,
                response.displayName,
                response.password,
                response.email,
                response.phone,
                parsed,
                this.state.selectedTags,
                this.state.selectedGroups,
            );

            this.setState({
                cover: createSucceedCover(
                    this.props.language,
                    id,
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
        }

        this.setState({
            loading: false,
        });
    }
}

export const Register: React.ComponentType = connector.connect(RegisterBase);
