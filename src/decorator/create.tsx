/**
 * @author WMXPY
 * @namespace Decorator
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
import { TitleManager } from "../util/title";
import { createDecorator } from "./repository/create";

type CreateDecoratorStates = {

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

type CreateDecoratorProps = RouteComponentProps & ConnectedStates;

export class CreateDecoratorBase extends React.Component<CreateDecoratorProps, CreateDecoratorStates> {

    public readonly state: CreateDecoratorStates = {

        loading: false,
        cover: undefined,
        flag: undefined,
        current: {},
    };

    public componentDidMount() {

        TitleManager.setNestedPage(PROFILE.DECORATOR, PROFILE.CREATE);
    }

    public componentWillUnmount(): void {

        TitleManager.restore();
    }

    public render() {

        return (
            <React.Fragment>
                <GoBack />
                <NeonSmartForm
                    loading={this.state.loading}
                    submit={this.props.language.get(PROFILE.SUBMIT)}
                    cover={this.state.cover}
                    flag={this.state.flag}
                    title={this.props.language.get(
                        PROFILE.CREATE_INSTANCE,
                        this.props.language.get(PROFILE.DECORATOR),
                    )}
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                    onSubmit={() => {
                        if (!this.state.current.name) {
                            window.alert(this.props.language.get(
                                PROFILE.INSTANCE_CAN_NOT_BE_EMPTY,
                                this.props.language.get(PROFILE.NAME),
                            ));
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

        this.setState({
            loading: true,
            cover: undefined,
            flag: undefined,
        });

        try {

            const id: string = await createDecorator(name, description);

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

export const CreateDecorator: React.ComponentType = connector.connect(CreateDecoratorBase);
