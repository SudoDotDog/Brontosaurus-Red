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
import { namePreferenceRepository } from "./repository/names";
import { readNamePreferenceRepository, ReadNamesRepositoryResponse } from "./repository/read-names";

export type NamesPreferenceStates = {

    readonly initial: ReadNamesRepositoryResponse | undefined;

    readonly current: any;
    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly flag: NeonFlagCut | undefined;
};

export type NamesPreferenceProp = {
} & RouteComponentProps;

export class NamesPreference extends React.Component<NamesPreferenceProp, NamesPreferenceStates> {

    public readonly state: NamesPreferenceStates = {

        initial: undefined,

        current: {},
        loading: false,
        cover: undefined,
        flag: undefined,
    };

    public constructor(props: NamesPreferenceProp) {

        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    public async componentDidMount() {

        const response: ReadNamesRepositoryResponse = await readNamePreferenceRepository();
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
                title="Change Names Preference"
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
            const changed: number = await namePreferenceRepository(
                current.systemName,
                current.accountName,
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
            systemName: {
                type: INPUT_TYPE.TEXT,
                display: 'System Name',
            },
            accountName: {
                type: INPUT_TYPE.TEXT,
                display: 'Account Name',
            },
        };
    }
}
