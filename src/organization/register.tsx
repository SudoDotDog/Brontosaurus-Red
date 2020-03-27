/**
 * @author WMXPY
 * @namespace Organization
 * @description Sub Register
 */

import { DEFAULT_BRONTOSAURUS_NAMESPACE } from "@brontosaurus/definition";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { registerInfo } from "../account/repository/register-infos";
import { GoBack } from "../components/go-back";
import { registerSubOrganization } from "./repository/register";

type OrganizationSubRegisterProp = {
} & RouteComponentProps;

type OrganizationSubRegisterStates = {

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

export class OrganizationSubRegister extends React.Component<OrganizationSubRegisterProp, OrganizationSubRegisterStates> {

    public readonly state: OrganizationSubRegisterStates = {

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
                <NeonTitle>Register Sub Account for {this._getOrganizationName()}</NeonTitle>
                <NeonSmartForm
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
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
            namespace: {
                type: INPUT_TYPE.TEXT,
                display: 'Namespace',
            },
            displayName: {
                type: INPUT_TYPE.TEXT,
                display: 'Display Name',
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

        if (!response.username) {
            alert('username required');
            return;
        }

        if (!response.namespace) {
            alert('namespace required');
            return;
        }

        try {
            const tempPassword: string = await registerSubOrganization(
                this._getOrganizationName(),
                response.username || '',
                response.namespace,
                response.displayName,
                response.email,
                response.phone,
                parsed,
            );

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

    private _getOrganizationName(): string {

        const params: any = this.props.match.params;
        return decodeURIComponent(params.organization);
    }
}
