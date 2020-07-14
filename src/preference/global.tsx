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
import { globalPreferenceRepository } from "./repository/global";
import { readGlobalPreferenceRepository, ReadGlobalRepositoryResponse } from "./repository/read-global";

export type GlobalPreferenceStates = {

    readonly initial: ReadGlobalRepositoryResponse | undefined;

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

export type GlobalPreferenceProps = RouteComponentProps & ConnectedStates;

export class GlobalPreferenceBase extends React.Component<GlobalPreferenceProps, GlobalPreferenceStates> {

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
                title={this.props.language.get(PROFILE.GLOBAL_PREFERENCES)}
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
                cover: createSucceedCover(
                    this.props.language,
                    `${changed} Preferences Updated`,
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
            globalAvatar: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.GLOBAL_AVATAR),
            },
            globalFavicon: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.GLOBAL_FAVICON),
            },
            globalHelpLink: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.GLOBAL_HELP_LINK),
            },
            globalPrivacyPolicy: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.GLOBAL_PRIVACY_POLICY),
            },
            indexPage: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.INDEX_PAGE),
            },
            entryPage: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.ENTRY_PAGE),
            },
        };
    }
}

export const GlobalPreference: React.ComponentType = connector.connect(GlobalPreferenceBase);
