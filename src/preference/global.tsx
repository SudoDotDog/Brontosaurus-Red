/**
 * @author WMXPY
 * @namespace Preference
 * @description Global
 */

import { SIGNAL } from "@sudoo/neon/declare";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonFromStructure, NeonSmartForm } from "@sudoo/neon/form";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { globalPreferenceRepository } from "./repository/global";
import { readGlobalPreferenceRepository, ReadGlobalRepositoryResponse } from "./repository/read-global";

export type GlobalPreferenceStates = {

    readonly initial: ReadGlobalRepositoryResponse | undefined;

    readonly current: any;
    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly flag: NeonFlagCut | undefined;
};

export type GlobalPreferenceProp = {
} & RouteComponentProps;

export class GlobalPreference extends React.Component<GlobalPreferenceProp, GlobalPreferenceStates> {

    public readonly state: GlobalPreferenceStates = {

        initial: undefined,

        current: {},
        loading: false,
        cover: undefined,
        flag: undefined,
    };

    public async componentDidMount() {

        const response: ReadGlobalRepositoryResponse = await readGlobalPreferenceRepository();
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
                title="Change Global Preference"
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
            const changed: number = await globalPreferenceRepository(
                current.globalAvatar,
                undefined,
                current.globalFavicon,
                current.globalHelpLink,
                current.globalPrivacyPolicy,
                current.indexPage,
                current.entryPage,
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
            globalAvatar: {
                type: INPUT_TYPE.TEXT,
                display: 'Global Avatar',
            },
            globalFavicon: {
                type: INPUT_TYPE.TEXT,
                display: 'Global Favicon',
            },
            globalHelpLink: {
                type: INPUT_TYPE.TEXT,
                display: 'Global Help Link',
            },
            globalPrivacyPolicy: {
                type: INPUT_TYPE.TEXT,
                display: 'Global Privacy Policy',
            },
            indexPage: {
                type: INPUT_TYPE.TEXT,
                display: 'Index Page',
            },
            entryPage: {
                type: INPUT_TYPE.TEXT,
                display: 'Entry Page',
            },
        };
    }
}
