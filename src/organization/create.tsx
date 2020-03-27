/**
 * @author WMXPY
 * @namespace Organization
 * @description Create
 */

import { DEFAULT_BRONTOSAURUS_NAMESPACE } from "@brontosaurus/definition";
import { SIGNAL } from "@sudoo/neon/declare";
import { NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { createOrganization } from "./repository/create";

type CreateOrganizationProp = {
} & RouteComponentProps;

type CreateOrganizationStates = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly current: Record<string, any>;
};

export class CreateOrganization extends React.Component<CreateOrganizationProp, CreateOrganizationStates> {

    public readonly state: CreateOrganizationStates = {

        loading: false,
        cover: undefined,
        current: {
            ownerNamespace: DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT,
        },
    };

    public render() {

        return (
            <React.Fragment>
                <GoBack />
                <NeonSmartForm
                    loading={this.state.loading}
                    cover={this.state.cover}
                    title="Create Organization"
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => this._submit(this.state.current.name, this.state.current.owner, this.state.current.ownerNamespace)}
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
            ownerNamespace: {
                type: INPUT_TYPE.TEXT,
                display: 'Owner Namespace',
            },
        };
    }

    private async _submit(name: string, owner: string, ownerNamespace: string) {

        this.setState({
            loading: true,
        });

        try {

            const id: string = await createOrganization(name, owner, ownerNamespace);

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
