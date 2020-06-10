/**
 * @author WMXPY
 * @namespace Namespace
 * @description Create
 */

import { SIGNAL } from "@sudoo/neon/declare";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { createNamespace } from "./repository/create";

type CreateNamespaceProp = {
} & RouteComponentProps;

type CreateNamespaceStates = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly flag: NeonFlagCut | undefined;
    readonly current: {
        name?: string;
        namespace?: string;
    };
};

export class CreateNamespace extends React.Component<CreateNamespaceProp, CreateNamespaceStates> {

    public readonly state: CreateNamespaceStates = {

        loading: false,
        cover: undefined,
        flag: undefined,
        current: {},
    };

    public render() {

        return (
            <React.Fragment>
                <GoBack />
                <NeonSmartForm
                    loading={this.state.loading}
                    submit="Create"
                    cover={this.state.cover}
                    flag={this.state.flag}
                    title="Create Namespace"
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => this._submit(this.state.current.name as string, this.state.current.namespace as string)}
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
            namespace: {
                type: INPUT_TYPE.TEXT,
                display: 'Namespace',
            },
        };
    }

    private async _submit(name: string, namespace: string) {

        if (!name) {
            window.alert('Name cannot be empty');
        }

        if (!namespace) {
            window.alert('Namespace cannot be empty');
        }

        this.setState({
            loading: true,
            cover: undefined,
            flag: undefined,
        });

        try {

            const createdName: string = await createNamespace(name, namespace);
            this.setState({
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",
                    info: createdName,

                    peek: {
                        children: "<-",
                        expend: "Complete",
                        onClick: () => {
                            this.props.history.goBack();
                        },
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
