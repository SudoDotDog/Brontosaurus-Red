/**
 * @author WMXPY
 * @namespace Application
 * @description Create
 */

import { MARGIN } from "@sudoo/neon/declare";
import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { createApplication } from "./repository/create";

type CreateApplicationProp = {
} & RouteComponentProps;

type CreateApplicationStates = {
    readonly current: any;
};

export class CreateApplication extends React.Component<CreateApplicationProp, CreateApplicationStates> {

    public readonly state: CreateApplicationStates = {
        current: {},
    };

    public render() {

        return (
            <React.Fragment>
                <NeonSub
                    margin={MARGIN.SMALL}
                    onClick={() => this.props.history.goBack()}>
                    Go Back
                </NeonSub>
                <NeonSmartForm
                    title="Create Application"
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
            key: INPUT_TYPE.TEXT,
            expire: INPUT_TYPE.NUMBER,
            secret: INPUT_TYPE.TEXT,
        };
    }

    private async _submit(current: Record<string, string>) {

        const id: string = await createApplication(
            current.name,
            current.key,
            Number(current.expire) || 360000,
            current.token,
        );
        console.log(id);
    }
}
