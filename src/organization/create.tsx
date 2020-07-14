/**
 * @author WMXPY
 * @namespace Organization
 * @description Create
 */

import { DEFAULT_BRONTOSAURUS_NAMESPACE } from "@brontosaurus/definition";
import { SudooFormat } from "@sudoo/internationalization";
import { NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { createOrganization } from "./repository/create";

type CreateOrganizationStates = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly current: Record<string, any>;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type CreateOrganizationProps = RouteComponentProps & ConnectedStates;

export class CreateOrganizationBase extends React.Component<CreateOrganizationProps, CreateOrganizationStates> {

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
                    title={this.props.language.get(
                        PROFILE.CREATE_INSTANCE,
                        this.props.language.get(PROFILE.ORGANIZATION),
                    )}
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    submit={this.props.language.get(PROFILE.SUBMIT)}
                    onSubmit={() => this._submit(this.state.current.name, this.state.current.owner, this.state.current.ownerNamespace)}
                />
            </React.Fragment>
        );
    }

    private _getForm(): Record<string, INPUT_TYPE | FromElement> {

        return {
            name: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.ORGANIZATION_NAME),
            },
            owner: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.OWNER_USERNAME),
            },
            ownerNamespace: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.OWNER_NAMESPACE),
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
                cover: createSucceedCover(
                    this.props.language,
                    id,
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
        }

        this.setState({
            loading: false,
        });
    }
}

export const CreateOrganization: React.ComponentType = connector.connect(CreateOrganizationBase);
