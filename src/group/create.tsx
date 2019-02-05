/**
 * @author WMXPY
 * @namespace Group
 * @description Create
 */

import { MARGIN } from "@sudoo/neon/declare";
import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { createGroup } from "./repository/create";

type CreateGroupProp = {
} & RouteComponentProps;

export class CreateGroup extends React.Component<CreateGroupProp> {

    public render() {

        return (
            <React.Fragment>
                <NeonSub onClick={() => this.props.history.goBack()}>Go Back</NeonSub>
                <NeonTitle>Create Group</NeonTitle>
                <NeonSmartForm
                    form={this._getForm()}
                    onSubmit={(response: any) => this._submit(response.name)}
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
