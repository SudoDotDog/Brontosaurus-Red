/**
 * @author WMXPY
 * @namespace Preference
 * @description Global
 */

import { MARGIN, SIGNAL } from "@sudoo/neon/declare";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonFromStructure, NeonSmartForm } from "@sudoo/neon/form";
import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
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

    public constructor(props: GlobalPreferenceProp) {

        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    public async componentDidMount() {

        const response: ReadGlobalRepositoryResponse = await readGlobalPreferenceRepository();
        this.setState({
            initial: response,
        });
    }

    public render() {

        return (<div>
            <NeonSub
                margin={MARGIN.SMALL}
                onClick={() => this.props.history.goBack()}>
                Go Back
            </NeonSub>
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

        const current: any = this.state.current;

        try {
            const changed: number = await globalPreferenceRepository(
                current.globalAvatar,
                undefined,
                current.globalHelpLink,
                current.globalPrivacyPolicy,
            );

            this.setState({
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",

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
            globalAvatar: {
                type: INPUT_TYPE.TEXT,
                display: 'Global Avatar',
            },
            globalHelpLink: {
                type: INPUT_TYPE.TEXT,
                display: 'Global Help Link',
            },
            globalPrivacyPolicy: {
                type: INPUT_TYPE.TEXT,
                display: 'Global Privacy Policy',
            },
        };
    }
}
