/**
 * @author WMXPY
 * @namespace Account
 * @description Register
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AllGroupsResponse, fetchAllGroups } from "../common/repository/all-group";
import { AllTagsResponse, fetchAllTags } from "../common/repository/all-tag";
import { GoBack } from "../components/go-back";
import { registerRepository } from "./repository/register";
import { registerInfo } from "./repository/register-infos";

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

export type RegisterProp = {
} & RouteComponentProps;


export class Register extends React.Component<RegisterProp, RegisterState> {

    public readonly state: RegisterState = {

        loading: false,
        cover: undefined,

        tags: [],
        selectedTags: [],
        groups: [],
        selectedGroups: [],

        current: {},
        infos: [],
    };

    public async componentDidMount() {

        const infos: Array<{
            name: string;
            type: string;
        }> = await registerInfo();
        this._fetchTags();
        this._fetchGroups();

        this.setState({
            infos: infos.map((info) => ({
                name: info.name,
                type: info.type,
            })),
        });
    }

    public render() {

        return (<React.Fragment>
            <GoBack />
            <NeonIndicator
                loading={this.state.loading}
                covering={Boolean(this.state.cover)}
                cover={this._renderSticker()}
            >
                <NeonTitle>Register Account</NeonTitle>
                <NeonSub margin={MARGIN.SMALL}>Information</NeonSub>
                <NeonSmartForm
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                />
                <NeonSub margin={MARGIN.SMALL}>Tags</NeonSub>
                <NeonPillGroup
                    margin={MARGIN.SMALL}
                    style={{ flexWrap: 'wrap' }}
                    selected={this.state.selectedTags}
                    onChange={(next: string[]) => this.setState({ selectedTags: next })}
                    addable
                    removable
                    options={this.state.tags}
                />
                <NeonSub margin={MARGIN.SMALL}>Groups</NeonSub>
                <NeonPillGroup
                    margin={MARGIN.SMALL}
                    style={{ flexWrap: 'wrap' }}
                    selected={this.state.selectedGroups}
                    onChange={(next: string[]) => this.setState({ selectedGroups: next })}
                    addable
                    removable
                    options={this.state.groups}
                />
                <NeonButton
                    onClick={() => this._submit(this.state.current)}
                    width={WIDTH.FULL}
                    size={SIZE.MEDIUM}
                    margin={MARGIN.SMALL}>
                    Submit
                    </NeonButton>
            </NeonIndicator>
        </React.Fragment>);
    }

    private _getForm(): Record<string, INPUT_TYPE | FromElement> {

        return {
            username: {
                type: INPUT_TYPE.TEXT,
                display: 'Username',
            },
            displayName: {
                type: INPUT_TYPE.TEXT,
                display: 'Display Name',
            },
            password: {
                type: INPUT_TYPE.PASSWORD,
                display: 'Password',
            },
            email: {
                type: INPUT_TYPE.EMAIL,
                display: 'Email Address',
            },
            phone: {
                type: INPUT_TYPE.NUMBER,
                display: 'Phone Number',
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

        const parsed: Record<string, string> = this.state.infos.reduce((previous: Record<string, string>, current: {
            name: string;
            type: string;
        }) => {

            return {
                ...previous,
                [current.name]: response[current.name] || '',
            };
        }, {} as Record<string, string>);

        try {
            const id: string = await registerRepository(
                response.username || '',
                response.displayName,
                response.password || '',
                response.email,
                response.phone,
                parsed,
                this.state.selectedTags,
                this.state.selectedGroups,
            );

            this.setState({
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",
                    info: id,

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
        }

        this.setState({
            loading: false,
        });
    }
}
