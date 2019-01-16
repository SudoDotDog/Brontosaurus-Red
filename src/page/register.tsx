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
        type: string;
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

        const infos: Array<{
            name: string;
            type: string;
        }> = await registerInfo();
        this.setState({
            infos: infos.map((info) => ({
                name: info.name,
                type: info.type,
                value: '',
            })),
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

            {this._renderInfos()}

            <NeonButton
                size={SIZE.MEDIUM}
                width={WIDTH.FULL}
                onClick={this._submit.bind(this)}
                margin={MARGIN.SMALL}>
                Perform
            </NeonButton>
        </div>);
    }

    private _renderInfos() {

        return this.state.infos.map((element: {
            name: string;
            type: string;
            value: string;
            // tslint:disable-next-line
        }, index: number) => {

            return (<NeonInput
                key={element.name}
                label={element.name}
                margin={MARGIN.SMALL}
                value={element.value}
                onChange={(value) => {

                    const currentInfo = [...this.state.infos];
                    currentInfo[index].value = value;

                    this.setState({
                        infos: currentInfo,
                    });
                }} />);
        });
    }

    private async _submit() {

        const parsed: Record<string, string> = this.state.infos.reduce((previous: Record<string, string>, current: {
            name: string;
            type: string;
            value: string;
        }) => {

            return {
                ...previous,
                [current.name]: current.value,
            };
        }, {} as Record<string, string>);
        const id: string =  await register(this.state.username, this.state.password, parsed);
        console.log(id);
    }
}
