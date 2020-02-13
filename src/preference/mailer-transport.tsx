/**
 * @author WMXPY
 * @namespace Preference
 * @description Mailer Transport
 */

import { SIGNAL } from "@sudoo/neon/declare";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonFromStructure, NeonSmartForm } from "@sudoo/neon/form";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { mailerTransportPreferenceRepository } from "./repository/mailer-transport";
import { readMailerTransportPreferenceRepository } from "./repository/read-mailer-transport";
import { ReadNamesRepositoryResponse } from "./repository/read-names";

export type MailerTransportPreferenceStates = {

    readonly current: {
        readonly config: string;
    };
    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly flag: NeonFlagCut | undefined;
};

export type MailerTransportPreferenceProp = {
} & RouteComponentProps;

export class MailerTransportPreference extends React.Component<MailerTransportPreferenceProp, MailerTransportPreferenceStates> {

    public readonly state: MailerTransportPreferenceStates = {

        current: {
            config: '',
        },
        loading: false,
        cover: undefined,
        flag: undefined,
    };

    public constructor(props: MailerTransportPreferenceProp) {

        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
    }

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
                title="Change Mailer Transport Preference"
                submit="Submit"
                cover={this.state.cover}
                flag={this.state.flag}
                value={this.state.current}
                onChange={(result: any) => this.setState({ current: result })}
                onSubmit={this._handleSubmit}
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
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",
                    info: changed ? `Preferences Updated` : `Preferences Not Updated`,

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

    private _getForm(): NeonFromStructure {

        return {
            config: {
                type: INPUT_TYPE.TEXT,
                display: 'Config',
            },
        };
    }
}
