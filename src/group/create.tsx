/**
 * @author WMXPY
 * @namespace Group
 * @description Create
 */

import { MARGIN } from "@sudoo/neon/declare";
import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { createGroup } from "./repository/create";

type CreateGroupProp = {
} & RouteComponentProps;

type CreateGroupStates = {
    readonly current: any;
};

export class CreateGroup extends React.Component<CreateGroupProp, CreateGroupStates> {

    public readonly state: CreateGroupStates = {
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
                    title="Create Group"
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

        const id: string = await createGroup(name);
        console.log(id);
    }
}
