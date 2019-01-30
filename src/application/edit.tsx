/**
 * @author WMXPY
 * @namespace Application
 * @description Edit
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonPair } from "@sudoo/neon/input";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SingleApplicationFetchResponse, singleFetchApplicationRepository } from "./repository/single-fetch";
import { updateApplicationRepository } from "./repository/update";

type ApplicationEditProp = {
} & RouteComponentProps;

type ApplicationEditState = {

    application: SingleApplicationFetchResponse | null;
};

export class ApplicationEdit extends React.Component<ApplicationEditProp, ApplicationEditState> {

    public state: ApplicationEditState = {
        application: null,
    };

    public async componentDidMount() {

        const response: SingleApplicationFetchResponse = await singleFetchApplicationRepository(this._getApplicationKey());

        this.setState({
            application: response,
        });
    }

    public render() {

        return (
            <div>
                <NeonSub onClick={() => this.props.history.goBack()}>Go Back</NeonSub>
                {this._renderEditableInfos()}
            </div>
        );
    }

    private _renderEditableInfos() {

        if (!this.state.application) {
            return null;
        }

        return (
            <NeonThemeProvider value={{
                margin: MARGIN.SMALL,
            }} >
                <NeonTitle>Edit: {this.state.application.key}</NeonTitle>

                <NeonPair
                    label="Key"
                    value={this.state.application.key} />

                <NeonPair
                    label="Avatar"
                    editable
                    value={this.state.application.avatar}
                    onChange={(value: string) => this._updateApplication('avatar', value)} />

                <NeonPair
                    label="Name"
                    editable
                    value={this.state.application.name}
                    onChange={(value: string) => this._updateApplication('name', value)} />

                <NeonPair
                    label="Expire"
                    editable
                    value={this.state.application.expire.toString()}
                    onChange={(value: string) => this._updateApplication('expire', Number(value))} />

                <NeonButton
                    size={SIZE.MEDIUM}
                    width={WIDTH.FULL}
                    onClick={() => this.state.application && updateApplicationRepository(this.state.application)}
                >
                    Save Change
                </NeonButton>
            </NeonThemeProvider>
        );
    }

    private _updateApplication<K extends keyof SingleApplicationFetchResponse>(key: K, value: SingleApplicationFetchResponse[K]): void {

        this.setState({
            application: {
                ...this.state.application as SingleApplicationFetchResponse,
                [key]: value,
            },
        });
    }

    private _getApplicationKey(): string {

        const params: any = this.props.match.params;
        return params.application;
    }
}
