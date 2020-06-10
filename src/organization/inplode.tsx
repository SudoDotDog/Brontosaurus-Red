/**
 * @author WMXPY
 * @namespace Organization
 * @description Inplode
 */

import { DEFAULT_BRONTOSAURUS_NAMESPACE } from "@brontosaurus/definition";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { registerInfo } from "../account/repository/register-infos";
import { AllTagsResponse, fetchAllTags } from "../common/repository/all-tag";
import { GoBack } from "../components/go-back";
import { inplodeOrganization } from "./repository/inplode";

type InplodeOrganizationProp = {
} & RouteComponentProps;

type InplodeOrganizationStates = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly infos: Array<{
        name: string;
        type: string;
    }>;
    readonly tags: string[];
    readonly selected: string[];
    readonly current: Record<string, any>;
};

export class InplodeOrganization extends React.Component<InplodeOrganizationProp, InplodeOrganizationStates> {

    public readonly state: InplodeOrganizationStates = {

        loading: false,
        cover: undefined,
        current: {
            namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT,
        },
        tags: [],
        selected: [],
        infos: [],
    };

    public async componentDidMount() {

        const infos: Array<{
            name: string;
            type: string;
        }> = await registerInfo();
        this._fetchTags();

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
                <NeonTitle>Inplode Organization</NeonTitle>
                <NeonSub margin={MARGIN.SMALL}>Organization and User</NeonSub>
                <NeonSmartForm
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                />
                <NeonSub margin={MARGIN.SMALL}>Tags</NeonSub>
                <NeonPillGroup
                    margin={MARGIN.SMALL}
                    style={{ flexWrap: 'wrap' }}
                    selected={this.state.selected}
                    onChange={(next: string[]) => this.setState({ selected: next })}
                    addable
                    removable
                    options={this.state.tags}
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
            name: {
                type: INPUT_TYPE.TEXT,
                display: 'Organization Name',
            },
            username: {
                type: INPUT_TYPE.TEXT,
                display: 'Owner Username',
            },
            namespace: {
                type: INPUT_TYPE.TEXT,
                display: 'Owner Namespace',
            },
            displayName: {
                type: INPUT_TYPE.TEXT,
                display: 'Owner Display Name',
            },
            email: {
                type: INPUT_TYPE.EMAIL,
                display: 'Owner Email Address',
            },
            phone: {
                type: INPUT_TYPE.NUMBER,
                display: 'Owner Phone Number',
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

    private async _fetchTags() {

        const tags: AllTagsResponse[] = await fetchAllTags();
        this.setState({
            tags: tags.map((res: AllTagsResponse) => res.name),
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

        if (!response.name) {
            alert('name required');
            return;
        }

        if (!response.username) {
            alert('username required');
            return;
        }

        if (!response.namespace) {
            alert('namespace required');
            return;
        }

        try {
            const tempPassword: string = await inplodeOrganization(
                response.name || '',
                response.username || '',
                response.namespace,
                response.displayName,
                response.email,
                response.phone,
                parsed,
                this.state.selected,
            );

            this.setState({
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",

                    peek: {
                        children: "<-",
                        expend: "Complete",
                        onClick: () => {
                            this.props.history.goBack();
                        },
                    },
                },
            });

            window.alert(`${response.username}'s temp new password is ${tempPassword}`);
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

    private _renderSticker() {

        if (!this.state.cover) {
            return null;
        }
        return <NeonSticker {...this.state.cover} />;
    }
}
