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

type RegisterState = {

    readonly username: string;
    readonly password: string;
};

type RegisterProp = {
} & RouteComponentProps;


export class Register extends React.Component<RegisterProp, RegisterState> {

    public state: RegisterState = {
        username: '',
        password: '',
    };

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
                margin={MARGIN.SMALL}>
                Perform
            </NeonButton>
        </div>);
    }
}
