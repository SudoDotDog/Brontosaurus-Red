/**
 * @author WMXPY
 * @namespace Page
 * @description Register
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonInput } from "@sudoo/neon/input";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { register } from "../repository/register";
import { registerInfo } from "../repository/register-infos";

type RegisterState = {

    readonly username: string;
    readonly password: string;

    readonly infos: Array<{
        name: string;
        value: string;
    }>;
};

type RegisterProp = {
} & RouteComponentProps;


export class Register extends React.Component<RegisterProp, RegisterState> {

    public state: RegisterState = {
        username: '',
        password: '',

        infos: [],
    };

    public async componentDidMount() {

        const infos = await registerInfo();
        this.setState({
            infos,
        });
    }

    public render() {
        return (<div>

            <NeonInput
                label="Username"
                margin={MARGIN.SMALL}
                value={this.state.username}
                onChange={(value) => this.setState({ username: value })} />
            <NeonInput
                label="Password"
                margin={MARGIN.SMALL}
                value={this.state.password}
                onChange={(value) => this.setState({ password: value })} />

            <NeonButton
                size={SIZE.MEDIUM}
                width={WIDTH.FULL}
                onClick={this._submit.bind(this)}
                margin={MARGIN.SMALL}>
                Perform
            </NeonButton>
        </div>);
    }

    private async _submit() {

        // const id: string =  await register(this.state.username, this.state.password)
    }
}
