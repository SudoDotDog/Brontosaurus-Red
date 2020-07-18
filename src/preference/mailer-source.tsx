/**
 * @author WMXPY
 * @namespace Preference
 * @description Mailer Source
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
import { mailerSourcePreferenceRepository } from "./repository/mailer-source";
import { readMailerSourcePreferenceRepository, ReadMailerSourceRepositoryResponse } from "./repository/read-mailer-source";

export type MailerSourcePreferenceStates = {

    readonly current: ReadMailerSourceRepositoryResponse;
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

export type MailerSourcePreferenceProp = RouteComponentProps & ConnectedStates;

export class MailerSourcePreferenceBase extends React.Component<MailerSourcePreferenceProp, MailerSourcePreferenceStates> {

    public readonly state: MailerSourcePreferenceStates = {

        current: {
            resetPassword: '',
            notification: '',
        },
        loading: false,
        cover: undefined,
        flag: undefined,
    };

    public async componentDidMount() {

        TitleManager.setNestedPage(PROFILE.PREFERENCE, PROFILE.MAILER_SOURCE);

        const response: ReadMailerSourceRepositoryResponse = await readMailerSourcePreferenceRepository();
        this.setState({
            current: response,
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
                title={this.props.language.get(PROFILE.MAILER_SOURCE)}
                submit={this.props.language.get(PROFILE.SAVE_CHANGE)}
                cover={this.state.cover}
                flag={this.state.flag}
                value={this.state.current}
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

        const current = this.state.current;

        try {
            const changes: number = await mailerSourcePreferenceRepository(
                current.resetPassword,
                current.notification,
            );

            this.setState({
                cover: createSucceedCover(
                    this.props.language,
                    this.props.language.get(
                        PROFILE.PREFERENCES_UPDATED,
                        changes.toString(),
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
            resetPassword: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.RESET_PASSWORD_EMAIL),
            },
            notification: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.NOTIFICATION_EMAIL),
            },
        };
    }
}

export const MailerSourcePreference: React.ComponentType = connector.connect(MailerSourcePreferenceBase);
