/**
 * @author WMXPY
 * @namespace Preference
 * @description Global Background Image
 */

import { produce } from "@sudoo/immutable";
import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton, NeonCoin } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonFlagCut, NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { NeonInput } from "@sudoo/neon/input";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonTitle } from "@sudoo/neon/typography";
import { randomUnique, } from "@sudoo/random";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as RedirectionStyle from "../../style/application/components/redirection.scss";
import { GoBack } from "../components/go-back";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { globalBackgroundImagesPreferenceRepository } from "./repository/global-background-image";
import { readGlobalBackgroundImagesPreferenceRepository, ReadGlobalBackgroundImagesRepositoryResponse } from "./repository/read-global-background-image";
import { sample } from "@sudoo/bark/array";

export type FixedGlobalBackgroundImage = {

    identifier: string;
    link: string;
};

export type GlobalBackgroundImagesPreferenceStates = {

    readonly globalBackgroundImages: FixedGlobalBackgroundImage[] | null;
    readonly preview: FixedGlobalBackgroundImage | null;

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

export type GlobalBackgroundImagesPreferenceProps = RouteComponentProps & ConnectedStates;

export class GlobalBackgroundImagesPreferenceBase extends React.Component<GlobalBackgroundImagesPreferenceProps, GlobalBackgroundImagesPreferenceStates> {

    public readonly state: GlobalBackgroundImagesPreferenceStates = {

        globalBackgroundImages: null,
        preview: null,

        loading: false,
        cover: undefined,
        flag: undefined,
    };

    public async componentDidMount() {

        this.setState({
            loading: true,
        })

        const response: ReadGlobalBackgroundImagesRepositoryResponse = await readGlobalBackgroundImagesPreferenceRepository();
        const images: string[] = response.globalBackgroundImages ?? [];

        const fixedImages: FixedGlobalBackgroundImage[] = images.map((each: string) => {

            return {
                identifier: randomUnique(),
                link: each,
            };
        });

        const current: FixedGlobalBackgroundImage | undefined = sample(fixedImages);

        this.setState({
            loading: false,
            globalBackgroundImages: fixedImages,
            preview: current ?? null,
        });
    }

    public render() {

        return (<div>
            <GoBack
                right={this.props.language.get(PROFILE.MORE)}
                onClickRight={() => this.props.history.goBack()}
            />
            {this._renderInfos()}
        </div>);
    }

    private _renderInfos() {

        const language: SudooFormat = this.props.language;
        return (<NeonThemeProvider value={{
            margin: MARGIN.SMALL,
        }} >
            <NeonIndicator
                loading={this.state.loading}
                covering={Boolean(this.state.cover)}
                cover={this._renderSticker()}
            >
                <NeonTitle>
                    {language.get(PROFILE.GLOBAL_BACKGROUND_IMAGES)}
                </NeonTitle>
                {this._renderPreview()}
                {this._renderImagesLinks()}
                <NeonButton
                    size={SIZE.MEDIUM}
                    width={WIDTH.FULL}
                    onClick={this._submit.bind(this)}
                >
                    {language.get(PROFILE.SAVE_CHANGE)}
                </NeonButton>
            </NeonIndicator>
        </NeonThemeProvider>);
    }

    private _renderPreview() {

        if (!this.state.preview) {
            return null;
        }

        return (<div>
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.SIMULATE_PREVIEW)}
            </NeonTitle>
            <img
                className={RedirectionStyle["preview-image"]}
                src={this.state.preview.link}
            />
            <NeonButton
                size={SIZE.MEDIUM}
                width={WIDTH.FULL}
                onClick={() => {

                    if (!this.state.globalBackgroundImages) {
                        return;
                    }

                    const current: FixedGlobalBackgroundImage | undefined = sample(this.state.globalBackgroundImages);

                    this.setState({
                        preview: current ?? null,
                    });
                }}
            >
                {this.props.language.get(PROFILE.GENERATE_SIMULATE_PREVIEW)}
            </NeonButton>
        </div>);
    }

    private _renderImagesLinks() {

        if (!this.state.globalBackgroundImages) {
            return null;
        }

        return (<div>
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.EDIT_BACKGROUND_IMAGES)}
            </NeonTitle>
            {this.state.globalBackgroundImages.map((each: FixedGlobalBackgroundImage, index: number) => {
                return this._renderImagesLink(each, index);
            })}
            <NeonCoin
                size={SIZE.NORMAL}
                onClick={() => {

                    if (!this.state.globalBackgroundImages) {
                        return;
                    }

                    this.setState({
                        globalBackgroundImages: [
                            ...this.state.globalBackgroundImages,
                            {
                                identifier: randomUnique(),
                                link: 'https://example.sudo.dog/background.jpg',
                            },
                        ],
                    });
                }}
            >+</NeonCoin>
        </div>);
    }

    private _renderImagesLink(imageLink: FixedGlobalBackgroundImage, index: number) {

        return (<div key={imageLink.identifier}>
            <div className={RedirectionStyle["name-container"]}>
                <NeonInput
                    className={RedirectionStyle["name-input"]}
                    label={this.props.language.get(PROFILE.IMAGE_LINK)}
                    value={imageLink.link}
                    onChange={(newLink: string) => {

                        if (!this.state.globalBackgroundImages) {
                            return;
                        }

                        this.setState({
                            globalBackgroundImages: produce(this.state.globalBackgroundImages, (draft: FixedGlobalBackgroundImage[]) => {
                                draft[index].link = newLink;
                            }),
                        });
                    }}
                />
                <NeonCoin
                    size={SIZE.NORMAL}
                    onClick={() => {

                        if (!this.state.globalBackgroundImages) {
                            return;
                        }

                        this.setState({
                            globalBackgroundImages: this.state.globalBackgroundImages.filter((_: FixedGlobalBackgroundImage, currentIndex: number) => {
                                return currentIndex !== index;
                            }),
                        });
                    }}
                >X</NeonCoin>
            </div>
        </div>);
    }

    private _renderSticker() {

        if (!this.state.cover) {
            return null;
        }
        return <NeonSticker {...this.state.cover} />;
    }

    private async _submit() {

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
                this.state.globalBackgroundImages.map((each: FixedGlobalBackgroundImage) => {
                    return each.link;
                }),
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

export const GlobalBackgroundImagesPreference: React.ComponentType = connector.connect(GlobalBackgroundImagesPreferenceBase);
