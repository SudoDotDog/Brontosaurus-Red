/**
 * @author WMXPY
 * @namespace Preference
 * @description Mailer Transport
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
import { mailerTransportPreferenceRepository } from "./repository/mailer-transport";
import { readMailerTransportPreferenceRepository } from "./repository/read-mailer-transport";

export type MailerTransportPreferenceStates = {

    readonly current: {
        readonly config: string;
    };
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

export type MailerTransportPreferenceProp = RouteComponentProps & ConnectedStates;

export class MailerTransportPreferenceBase extends React.Component<MailerTransportPreferenceProp, MailerTransportPreferenceStates> {

    public readonly state: MailerTransportPreferenceStates = {

        current: {
            config: '',
        },
        loading: false,
        cover: undefined,
        flag: undefined,
    };

    public async componentDidMount() {

        const response: string = await readMailerTransportPreferenceRepository();
        this.setState({
            current: {
                config: response,
            },
        });
    }

    public render() {

        return (<div>
            <GoBack />
            <NeonSmartForm
                loading={this.state.loading}
                form={this._getForm()}
                title={this.props.language.get(PROFILE.MAILER_TRANSPORT)}
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
            const changed: boolean = await mailerTransportPreferenceRepository(
                current.config,
            );

            this.setState({
                cover: createSucceedCover(
                    this.props.language,
                    this.props.language.get(
                        changed ? PROFILE.PREFERENCE_UPDATED
                            : PROFILE.PREFERENCE_NOT_UPDATED,
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
            config: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.CONFIG),
            },
        };
    }
}

export const MailerTransportPreference: React.ComponentType = connector.connect(MailerTransportPreferenceBase);
