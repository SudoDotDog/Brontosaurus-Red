/**
 * @author WMXPY
 * @namespace Preference
 * @description Global
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonFromStructure, NeonSmartForm } from "@sudoo/neon/form";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { TitleManager } from "../util/title";
import { namePreferenceRepository } from "./repository/names";
import { readNamePreferenceRepository, ReadNamesRepositoryResponse } from "./repository/read-names";

export type NamesPreferenceStates = {

    readonly initial: ReadNamesRepositoryResponse | undefined;

    readonly current: any;
    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly flag: NeonFlagCut | undefined;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type NamesPreferenceProp = RouteComponentProps & ConnectedStates;

export class NamesPreferenceBase extends React.Component<NamesPreferenceProp, NamesPreferenceStates> {

    public readonly state: NamesPreferenceStates = {

        initial: undefined,

        current: {},
        loading: false,
        cover: undefined,
        flag: undefined,
    };

    public async componentDidMount() {

        TitleManager.setNestedPage(PROFILE.PREFERENCE, PROFILE.NAME_PREFERENCES);

        const response: ReadNamesRepositoryResponse = await readNamePreferenceRepository();
        this.setState({
            initial: response,
        });
    }

    public componentWillUnmount() {

        TitleManager.restore();
    }

    public render() {

        return (<div>
            <GoBack />
            <NeonSmartForm
                loading={this.state.loading}
                form={this._getForm()}
                title={this.props.language.get(PROFILE.NAME_PREFERENCES)}
                submit={this.props.language.get(PROFILE.SAVE_CHANGE)}
                cover={this.state.cover}
                flag={this.state.flag}
                value={{
                    ...this.state.initial,
                    ...this.state.current,
                }}
                onChange={(result: any) => this.setState({ current: result })}
                onSubmit={this._handleSubmit.bind(this)}
            />
        </div>);
    }

    private async _handleSubmit() {

        this.setState({
            cover: undefined,
            flag: undefined,
            loading: true,
        });

        const current: any = this.state.current;

        try {
            const changed: number = await namePreferenceRepository(
                current.systemName,
                current.accountName,
                current.commandCenterName,
            );

            this.setState({
                cover: createSucceedCover(
                    this.props.language,
                    this.props.language.get(
                        PROFILE.PREFERENCES_UPDATED,
                        changed.toString(),
                    ),
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

    private _getForm(): NeonFromStructure {

        return {
            systemName: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.SYSTEM_NAME),
            },
            accountName: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.ACCOUNT_NAME),
            },
            commandCenterName: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.COMMAND_CENTER_NAME),
            },
        };
    }
}

export const NamesPreference: React.ComponentType = connector.connect(NamesPreferenceBase);
