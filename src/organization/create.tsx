/**
 * @author WMXPY
 * @namespace Organization
 * @description Create
 */

import { MARGIN } from "@sudoo/neon/declare";
import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { createOrganization } from "./repository/create";

type CreateOrganizationProp = {
} & RouteComponentProps;

type CreateOrganizationStates = {
    readonly current: any;
};

export class CreateOrganization extends React.Component<CreateOrganizationProp, CreateOrganizationStates> {

    public readonly state: CreateOrganizationStates = {
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
                    title="Create Organization"
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => this._submit(this.state.current.name)}
                />
            </React.Fragment>
        );
    }

    private _getForm(): Record<string, INPUT_TYPE> {

        return {
            name: INPUT_TYPE.TEXT,
        };
    }

    private async _submit(name: string) {

        const id: string = await createOrganization(name);
        console.log(id);
    }
}
