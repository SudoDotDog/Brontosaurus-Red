/**
 * @author WMXPY
 * @namespace Application
 * @description Create
 */

import { MARGIN, SIGNAL } from "@sudoo/neon/declare";
import { NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { createApplication } from "./repository/create";

type CreateApplicationProp = {
} & RouteComponentProps;

type CreateApplicationStates = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly current: any;
};

export class CreateApplication extends React.Component<CreateApplicationProp, CreateApplicationStates> {

    public readonly state: CreateApplicationStates = {

        loading: false,
        cover: undefined,
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
                    loading={this.state.loading}
                    cover={this.state.cover}
                    title="Create Application"
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => this._submit(this.state.current)}
                />
            </React.Fragment>
        );
    }

    private _getForm(): Record<string, INPUT_TYPE | FromElement> {

        return {
            name: {
                type: INPUT_TYPE.TEXT,
                display: 'Application Name',
            },
            key: {
                type: INPUT_TYPE.TEXT,
                display: 'Application Key',
            },
            expire: {
                type: INPUT_TYPE.NUMBER,
                display: 'Expire Time',
            },
            secret: {
                type: INPUT_TYPE.TEXT,
                display: 'Application Secret',
            },
        };
    }

    private async _submit(current: Record<string, string>) {

        this.setState({
            loading: true,
        });

        try {
            const id: string = await createApplication(
                current.name,
                current.key,
                Number(current.expire) || 360000,
                current.secret,
            );

            this.setState({
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",
                    info: id,

                    peek: {
                        children: "<-",
                        expend: "Complete",
                        onClick: this.props.history.goBack,
                    },
                },
            });
        } catch (err) {

            this.setState({
                cover: {
                    type: SIGNAL.ERROR,
                    title: "Failed",
                    info: err.message,

                    peek: {
                        children: "<-",
                        expend: "Retry",
                        onClick: () => this.setState({ cover: undefined }),
                    },
                },
            });
        }

        this.setState({
            loading: false,
        });
    }
}
