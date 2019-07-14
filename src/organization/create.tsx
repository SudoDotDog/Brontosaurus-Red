/**
 * @author WMXPY
 * @namespace Organization
 * @description Create
 */

import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
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
                <GoBack />
                <NeonSmartForm
                    title="Create Organization"
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => this._submit(this.state.current.name, this.state.current.owner)}
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
            owner: {
                type: INPUT_TYPE.TEXT,
                display: 'Owner Username',
            },
        };
    }

    private async _submit(name: string, owner: string) {

        const id: string = await createOrganization(name, owner);
        console.log(id);
    }
}
