/**
 * @author WMXPY
 * @namespace Decorator
 * @description Create
 */

import { MARGIN } from "@sudoo/neon/declare";
import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { createDecorator } from "./repository/create";

type CreateDecoratorProp = {
} & RouteComponentProps;

type CreateDecoratorStates = {
    readonly current: {
        name?: string;
        description?: string;
    };
};

export class CreateDecorator extends React.Component<CreateDecoratorProp, CreateDecoratorStates> {

    public readonly state: CreateDecoratorStates = {
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
                    title="Create Decorator"
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => this._submit(this.state.current.name, this.state.current.description)}
                />
            </React.Fragment>
        );
    }

    private _getForm(): Record<string, INPUT_TYPE> {

        return {
            name: INPUT_TYPE.TEXT,
            description: INPUT_TYPE.TEXT,
        };
    }

    private async _submit(name?: string, description?: string) {

        if (!name) {
            window.alert('Name cannot be empty');
        }

        const id: string = await createDecorator(name, description);
        console.log(id);
    }
}
