/**
 * @author WMXPY
 * @namespace Application
 * @description Create
 */

import { SudooFormat } from "@sudoo/internationalization";
import { TimeBuilder } from "@sudoo/magic";
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
import { createApplication } from "./repository/create";

type CreateApplicationStates = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly current: any;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type CreateApplicationProps = RouteComponentProps & ConnectedStates;

export class CreateApplicationBase extends React.Component<CreateApplicationProps, CreateApplicationStates> {

    public readonly state: CreateApplicationStates = {

        loading: false,
        cover: undefined,
        current: {},
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
                        this.props.language.get(PROFILE.APPLICATION),
                    )}
                    submit={this.props.language.get(PROFILE.SUBMIT)}
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => {

                        if (!this.state.current.name) {
                            alert(this.props.language.get(
                                PROFILE.INSTANCE_CAN_NOT_BE_EMPTY,
                                this.props.language.get(PROFILE.APPLICATION_NAME),
                            ));
                        }

                        if (!this.state.current.key) {
                            alert(this.props.language.get(
                                PROFILE.INSTANCE_CAN_NOT_BE_EMPTY,
                                this.props.language.get(PROFILE.APPLICATION_KEY),
                            ));
                        }

                        if (!this.state.current.expire) {
                            alert(this.props.language.get(
                                PROFILE.INSTANCE_CAN_NOT_BE_EMPTY,
                                this.props.language.get(PROFILE.EXPIRE_TIME),
                            ));
                        }

                        this._submit(this.state.current);
                    }}
                />
            </React.Fragment>
        );
    }

    private _getForm(): Record<string, INPUT_TYPE | FromElement> {

        return {
            name: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.APPLICATION_NAME),
            },
            key: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.APPLICATION_KEY),
            },
            expire: {
                type: INPUT_TYPE.NUMBER,
                display: this.props.language.get(PROFILE.EXPIRE_TIME),
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
                Number(current.expire) ?? TimeBuilder.from({
                    hour: 1,
                }).inMilliseconds(),
            );

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

export const CreateApplication: React.ComponentType = connector.connect(CreateApplicationBase);
