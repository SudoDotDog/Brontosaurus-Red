/**
 * @author WMXPY
 * @namespace Account
 * @description Register
 */

import { MARGIN } from "@sudoo/neon/declare";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { register } from "./repository/register";
import { registerInfo } from "./repository/register-infos";

type RegisterState = {

    readonly infos: Array<{
        name: string;
        type: string;
    }>;
    readonly current: any;
};

type RegisterProp = {
} & RouteComponentProps;


export class Register extends React.Component<RegisterProp, RegisterState> {

    public readonly state: RegisterState = {

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

        return (<NeonThemeProvider value={{
            margin: MARGIN.SMALL,
        }}>
            <NeonSub onClick={() => this.props.history.goBack()}>Go Back</NeonSub>
            <NeonSmartForm
                title="Register"
                form={this._getForm()}
                value={this.state.current}
                onChange={(value: any) => this.setState({ current: value })}
                onSubmit={() => this._submit(this.state.current)}
            />
        </NeonThemeProvider>);
    }

    private _getForm(): Record<string, INPUT_TYPE | FromElement> {

        return {
            username: {
                type: INPUT_TYPE.TEXT,
                display: 'Username',
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

    private async _submit(response: Record<string, any>) {

        const parsed: Record<string, string> = this.state.infos.reduce((previous: Record<string, string>, current: {
            name: string;
            type: string;
        }) => {

            return {
                ...previous,
                [current.name]: response[current.name] || '',
            };
        }, {} as Record<string, string>);

        const id: string = await register(
            response.username || '',
            response.password || '',
            response.email,
            response.phone,
            parsed,
        );
        console.log(id);
    }
}
