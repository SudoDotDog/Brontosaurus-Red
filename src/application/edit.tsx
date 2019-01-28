/**
 * @author WMXPY
 * @namespace Application
 * @description Edit
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSmartList } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SingleApplicationFetchResponse, singleFetchApplicationRepository } from "./repository/single-fetch";

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
                <NeonTitle>Edit: {this.state.application.name}</NeonTitle>
                {/* <NeonTitle size={SIZE.MEDIUM}>Information</NeonTitle>
                <NeonSmartList
                    list={this.state.user.infos}
                    editableName
                    editableValue
                    onChange={(newInfo) => this.setState({
                        user: {
                            ...this.state.user as any,
                            infos: newInfo,
                        },
                    })} />
                <NeonTitle size={SIZE.MEDIUM}>Beacon</NeonTitle>

                <NeonSmartList
                    list={this.state.user.beacons}
                    editableValue
                    onChange={(newBeacon) => this.setState({
                        user: {
                            ...this.state.user as any,
                            beacons: newBeacon,
                        },
                    })} />
                <NeonTitle size={SIZE.MEDIUM}>User Group</NeonTitle>
                {JSON.stringify(this.state.user.groups)} */}

                <NeonSmartList
                    list={this.state.application as any}
                />

                <NeonButton size={SIZE.MEDIUM} width={WIDTH.FULL}>Save Change</NeonButton>
            </NeonThemeProvider>
        );
    }

    private _getApplicationKey(): string {

        const params: any = this.props.match.params;
        return params.application;
    }
}
