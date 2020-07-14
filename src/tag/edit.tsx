/**
 * @author WMXPY
 * @namespace Tag
 * @description Edit
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSmartList } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ActiveStatus } from "../components/active-status";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { singleTagRepository, SingleTagResponse } from "./repository/single";
import { updateTagRepository } from "./repository/update";

type TagEditState = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly tag: SingleTagResponse | null;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type TagEditProp = RouteComponentProps & ConnectedStates;

export class TagEditBase extends React.Component<TagEditProp, TagEditState> {

    public readonly state: TagEditState = {

        loading: false,
        cover: undefined,
        tag: null,
    };

    public async componentDidMount() {

        const response: SingleTagResponse = await singleTagRepository(this._getTagName());

        this.setState({
            tag: response,
        });
    }

    public render() {

        return (
            <div>
                <GoBack
                    right={this.props.language.get(PROFILE.MORE)}
                    onClickRight={() => this.props.history.push('/admin/tag/more/' + encodeURIComponent(this._getTagName()))}
                />
                {this._renderEditableInfos()}
            </div>
        );
    }

    private _renderEditableInfos() {

        if (!this.state.tag) {
            return null;
        }

        return (
            <NeonThemeProvider value={{
                margin: MARGIN.SMALL,
            }} >
                <NeonIndicator
                    loading={this.state.loading}
                    covering={Boolean(this.state.cover)}
                    cover={this._renderSticker()}
                >
                    <NamedTitle about={this.props.language.get(
                        PROFILE.EDITING,
                        this.props.language.get(PROFILE.TAG)
                    )}>
                        {this.state.tag.name}
                    </NamedTitle>
                    <ActiveStatus
                        active={this.state.tag.active}
                    />
                    {this._renderDescription()}
                    <NeonButton
                        size={SIZE.MEDIUM}
                        width={WIDTH.FULL}
                        onClick={this._submit.bind(this)}>
                        {this.props.language.get(PROFILE.SAVE_CHANGE)}
                    </NeonButton>
                </NeonIndicator>
            </NeonThemeProvider>
        );
    }

    private _renderDescription() {

        const tag = this.state.tag as SingleTagResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.DESCRIPTION)}
            </NeonTitle>
            <NeonSmartList
                name={this.props.language.get(PROFILE.KEY)}
                value={this.props.language.get(PROFILE.VALUE)}
                list={{
                    Description: tag.description || '',
                }}
                editableValue
                onChange={(newInfo: Record<string, string>) => this.setState({
                    tag: {
                        ...tag,
                        description: newInfo.Description,
                    },
                })}
            />
        </React.Fragment>);
    }

    private _renderSticker() {

        if (!this.state.cover) {
            return null;
        }
        return <NeonSticker {...this.state.cover} />;
    }

    private async _submit() {

        if (!this.state.tag) {
            return;
        }

        this.setState({
            loading: true,
            cover: undefined,
        });

        try {

            const name: string = await updateTagRepository({
                name: this.state.tag.name,
                description: this.state.tag.description,
            });

            this.setState({
                cover: createSucceedCover(
                    this.props.language,
                    name,
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
        } finally {

            this.setState({
                loading: false,
            });
        }
    }

    private _getTagName(): string {

        const params: any = this.props.match.params;
        return params.tag;
    }
}

export const TagEdit: React.ComponentType = connector.connect(TagEditBase);
