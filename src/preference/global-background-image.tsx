/**
 * @author WMXPY
 * @namespace Preference
 * @description Global Background Image
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { globalBackgroundImagesPreferenceRepository } from "./repository/global-background-image";
import { readGlobalBackgroundImagesPreferenceRepository, ReadGlobalBackgroundImagesRepositoryResponse } from "./repository/read-global-background-image";

export type GlobalPreferenceStates = {

    readonly globalBackgroundImages: string[] | null;
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

        globalBackgroundImages: null,

        loading: false,
        cover: undefined,
        flag: undefined,
    };

    public async componentDidMount() {

        const response: ReadGlobalBackgroundImagesRepositoryResponse = await readGlobalBackgroundImagesPreferenceRepository();
        this.setState({
            globalBackgroundImages: response.globalBackgroundImages,
        });
    }

    public render() {

        return (<div>
            <GoBack />
        </div>);
    }

    private async _handleSubmit() {

        if (!this.state.globalBackgroundImages) {
            return;
        }

        this.setState({
            cover: undefined,
            flag: undefined,
            loading: true,
        });

        try {
            const changed: number = await globalBackgroundImagesPreferenceRepository(
                this.state.globalBackgroundImages,
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
}

export const GlobalPreference: React.ComponentType = connector.connect(GlobalPreferenceBase);
