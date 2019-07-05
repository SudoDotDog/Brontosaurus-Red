/**
 * @author WMXPY
 * @namespace Group
 * @description Create
 */

import { MARGIN, SIGNAL } from "@sudoo/neon/declare";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { createGroup } from "./repository/create";

type CreateGroupProp = {
} & RouteComponentProps;

type CreateGroupStates = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly flag: NeonFlagCut | undefined;
    readonly current: {
        name?: string;
        description?: string;
    };
};

export class CreateGroup extends React.Component<CreateGroupProp, CreateGroupStates> {

    public readonly state: CreateGroupStates = {

        loading: false,
        cover: undefined,
        flag: undefined,
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
                    submit="Create"
                    cover={this.state.cover}
                    flag={this.state.flag}
                    title="Create Group"
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => this._submit(this.state.current.name as string, this.state.current.description)}
                />
            </React.Fragment>
        );
    }

    private _getForm(): Record<string, INPUT_TYPE | FromElement> {

        return {
            name: {
                type: INPUT_TYPE.TEXT,
                display: 'Name',
            },
            description: {
                type: INPUT_TYPE.TEXT,
                display: 'Description',
            },
        };
    }

    private async _submit(name: string, description?: string) {

        if (!name) {
            window.alert('Name cannot be empty');
        }

        this.setState({
            loading: true,
            cover: undefined,
            flag: undefined,
        });

        try {

            const id: string = await createGroup(name, description);
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
        } finally {

            this.setState({
                loading: false,
            });
        }
    }
}
