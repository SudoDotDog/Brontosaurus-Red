/**
 * @author WMXPY
 * @namespace Preference
 * @description Mailer Source
 */

import { SudooFormat } from "@sudoo/internationalization";
import { SIGNAL } from "@sudoo/neon/declare";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonFromStructure, NeonSmartForm } from "@sudoo/neon/form";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { intl } from "../i18n/intl";
import { IStore } from "../state/declare";
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

        const response: ReadMailerSourceRepositoryResponse = await readMailerSourcePreferenceRepository();
        this.setState({
            current: response,
        });
    }

    public render() {

        return (<div>
            <GoBack />
            <NeonSmartForm
                loading={this.state.loading}
                form={this._getForm()}
                title="Change Mailer Transport Preference"
                submit="Submit"
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
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",
                    info: `${changes} Preferences Updated`,

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
        }
        this.setState({
            loading: false,
        });
    }

    private _getForm(): NeonFromStructure {

        return {
            resetPassword: {
                type: INPUT_TYPE.TEXT,
                display: 'Reset Password Email',
            },
            notification: {
                type: INPUT_TYPE.TEXT,
                display: 'Notification Email',
            },
        };
    }
}

export const MailerSourcePreference: React.ComponentType = connector.connect(MailerSourcePreferenceBase);
