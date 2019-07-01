/**
 * @author WMXPY
 * @namespace Organization
 * @description Inplode
 */

import { MARGIN, SIGNAL } from "@sudoo/neon/declare";
import { NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { registerInfo } from "../account/repository/register-infos";
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
    readonly current: any;
};

export class InplodeOrganization extends React.Component<InplodeOrganizationProp, InplodeOrganizationStates> {

    public readonly state: InplodeOrganizationStates = {

        loading: false,
        cover: undefined,
        current: {},
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

        return (
            <React.Fragment>
                <NeonSub
                    margin={MARGIN.SMALL}
                    onClick={() => this.props.history.goBack()}>
                    Go Back
                </NeonSub>
                <NeonSmartForm
                    loading={this.state.loading}
                    cover={this.state.cover}
                    title="Inplode Organization"
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => this._submit(this.state.current)}
                />
            </React.Fragment>
        );
    }

    private _getForm(): Record<string, INPUT_TYPE | FromElement> {

        return {
            name: {
                type: INPUT_TYPE.TEXT,
                display: 'Organization Name',
            },
            username: {
                type: INPUT_TYPE.TEXT,
                display: 'Username',
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

        try {
            const tempPassword: string = await inplodeOrganization(
                response.name || '',
                response.username || '',
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
}
