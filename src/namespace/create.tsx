/**
 * @author WMXPY
 * @namespace Namespace
 * @description Create
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { intl } from "../i18n/intl";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { createNamespace } from "./repository/create";

type CreateNamespaceStates = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly flag: NeonFlagCut | undefined;
    readonly current: {
        name?: string;
        namespace?: string;
    };
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type CreateNamespaceProps = RouteComponentProps & ConnectedStates;

export class CreateNamespaceBase extends React.Component<CreateNamespaceProps, CreateNamespaceStates> {

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
                cover: createSucceedCover(
                    this.props.language,
                    createdName,
                    () => this.props.history.goBack(),
                ),
            });
        } catch (err) {

            this.setState({
                cover: createFailedCover(
                    this.props.language,
                    err.message,
                    () => this.setState({ cover: undefined }),
                ),
            });
        } finally {

            this.setState({
                loading: false,
            });
        }
    }
}

export const CreateNamespace: React.ComponentType = connector.connect(CreateNamespaceBase);
