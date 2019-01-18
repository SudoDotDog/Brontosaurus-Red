/**
 * @author WMXPY
 * @namespace Page
 * @description Register
 */

import { MARGIN } from "@sudoo/neon/declare";
import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { register } from "../repository/register";
import { registerInfo } from "../repository/register-infos";

type RegisterState = {

    readonly infos: Array<{
        name: string;
        type: string;
    }>;
};

type RegisterProp = {
} & RouteComponentProps;


export class Register extends React.Component<RegisterProp, RegisterState> {

    public state: RegisterState = {

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
            <NeonThemeProvider value={{
                margin: MARGIN.SMALL,
            }}>
                <NeonSmartForm
                    form={this._getForm()}
                    onSubmit={(response: any) => this._submit(response)}
                />
            </NeonThemeProvider>);
    }

    private _getForm(): Record<string, INPUT_TYPE> {

        return {
            username: INPUT_TYPE.TEXT,
            password: INPUT_TYPE.PASSWORD,
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

        const id: string = await register(response.username || '', response.password || '', parsed);
        console.log(id);
    }
}
