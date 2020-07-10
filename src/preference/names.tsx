/**
 * @author WMXPY
 * @namespace Preference
 * @description Global
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

        const response: ReadNamesRepositoryResponse = await readNamePreferenceRepository();
        this.setState({
            initial: response,
        });
    }

    public render() {

        return (<div>
            <GoBack />
            <NeonSmartForm
                loading={this.state.loading}
                form={this._getForm()}
                title="Change Names Preference"
                submit="Submit"
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
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",
                    info: `${changed} Preferences Updated`,

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
            systemName: {
                type: INPUT_TYPE.TEXT,
                display: 'System Name',
            },
            accountName: {
                type: INPUT_TYPE.TEXT,
                display: 'Account Name',
            },
            commandCenterName: {
                type: INPUT_TYPE.TEXT,
                display: 'Command Center Name',
            },
        };
    }
}

export const NamesPreference: React.ComponentType = connector.connect(NamesPreferenceBase);
