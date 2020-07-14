/**
 * @author WMXPY
 * @namespace Group
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
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { createGroup } from "./repository/create";

type CreateGroupStates = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly flag: NeonFlagCut | undefined;
    readonly current: {
        name?: string;
        description?: string;
    };
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type CreateGroupProps = RouteComponentProps & ConnectedStates;

export class CreateGroupBase extends React.Component<CreateGroupProps, CreateGroupStates> {

    public readonly state: CreateGroupStates = {

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
                    title={this.props.language.get(
                        PROFILE.CREATE_INSTANCE,
                        this.props.language.get(PROFILE.GROUP),
                    )}
                    submit={this.props.language.get(PROFILE.SUBMIT)}
                    cover={this.state.cover}
                    flag={this.state.flag}
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => {
                        if (!this.state.current.name) {
                            return;
                        }
                        this._submit(this.state.current.name, this.state.current.description);
                    }}
                />
            </React.Fragment>
        );
    }

    private _getForm(): Record<string, INPUT_TYPE | FromElement> {

        return {
            name: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.NAME),
            },
            description: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.DESCRIPTION),
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
        } finally {

            this.setState({
                loading: false,
            });
        }
    }
}

export const CreateGroup: React.ComponentType = connector.connect(CreateGroupBase);
