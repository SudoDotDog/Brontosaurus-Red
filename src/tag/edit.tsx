/**
 * @author WMXPY
 * @namespace Tag
 * @description Edit
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker } from "@sudoo/neon/flag";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSmartList } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { singleTagRepository, SingleTagResponse } from "./repository/single";
import { updateTagRepository } from "./repository/update";

type TagEditProp = {
} & RouteComponentProps;

type TagEditState = {

    readonly loading: boolean;
    readonly cover: any;
    readonly tag: SingleTagResponse | null;
};

export class TagEdit extends React.Component<TagEditProp, TagEditState> {

    public readonly state: TagEditState = {

        loading: false,
        cover: undefined,
        tag: null,
    };

    public constructor(props: TagEditProp) {

        super(props);

        this._submit = this._submit.bind(this);
    }

    public async componentDidMount() {

        const response: SingleTagResponse = await singleTagRepository(this._getTagName());

        this.setState({
            tag: response,
        });
    }

    public render() {

        return (
            <div>
                <NeonSub onClick={() => this.props.history.goBack()}>Go Back</NeonSub>
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
                    <NeonTitle>Edit: {this.state.tag.name}</NeonTitle>
                    {this._renderDescription()}
                    <NeonButton
                        size={SIZE.MEDIUM}
                        width={WIDTH.FULL}
                        onClick={this._submit}>
                        Save Change
                    </NeonButton>
                </NeonIndicator>
            </NeonThemeProvider>
        );
    }

    private _renderDescription() {

        const tag = this.state.tag as SingleTagResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Description</NeonTitle>
            <NeonSmartList
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
                addableGroups: this.state.tag.addableGroups,
                removableGroups: this.state.tag.removableGroups,
            });

            this.setState({
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",
                    info: name,

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
