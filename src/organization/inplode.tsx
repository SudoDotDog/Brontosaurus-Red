/**
 * @author WMXPY
 * @namespace Organization
 * @description Inplode
 */

import { MARGIN } from "@sudoo/neon/declare";
import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { registerInfo } from "../account/repository/register-infos";
import { inplodeOrganization } from "./repository/inplode";

type InplodeOrganizationProp = {
} & RouteComponentProps;

type InplodeOrganizationStates = {
    readonly infos: Array<{
        name: string;
        type: string;
    }>;
    readonly current: any;
};

export class InplodeOrganization extends React.Component<InplodeOrganizationProp, InplodeOrganizationStates> {

    public readonly state: InplodeOrganizationStates = {

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
                    title="Inplode Organization"
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => this._submit(this.state.current)}
                />
            </React.Fragment>
        );
    }

    private _getForm(): Record<string, INPUT_TYPE> {

        return {
            name: INPUT_TYPE.TEXT,
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

        const id: string = await inplodeOrganization(
            response.name || '',
            response.username || '',
            response.password || '',
            parsed,
        );
        console.log(id);
    }
}
