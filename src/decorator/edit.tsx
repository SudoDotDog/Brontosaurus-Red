/**
 * @author WMXPY
 * @namespace Decorator
 * @description Edit
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker } from "@sudoo/neon/flag";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSmartList } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AllGroupsResponse, fetchAllGroups } from "../common/repository/all-group";
import { singleDecorator, SingleDecoratorResponse } from "./repository/single";
import { updateDecoratorRepository } from "./repository/update";


type DecoratorEditProp = {
} & RouteComponentProps;

type DecoratorEditState = {

    readonly loading: boolean;
    readonly cover: any;
    readonly decorator: SingleDecoratorResponse | null;
    readonly groups: string[];
};

export class DecoratorEdit extends React.Component<DecoratorEditProp, DecoratorEditState> {

    public readonly state: DecoratorEditState = {

        loading: false,
        cover: undefined,
        decorator: null,
        groups: [],
    };

    public constructor(props: DecoratorEditProp) {

        super(props);

        this._submit = this._submit.bind(this);
    }

    public async componentDidMount() {

        const response: SingleDecoratorResponse = await singleDecorator(this._getDecoratorName());
        const groups: AllGroupsResponse[] = await fetchAllGroups();

        this.setState({
            decorator: response,
            groups: groups.map((res: AllGroupsResponse) => res.name),
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

        if (!this.state.decorator) {
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
                    <NeonTitle>Edit: {this.state.decorator.name}</NeonTitle>
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

        const decorator = this.state.decorator as SingleDecoratorResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Description</NeonTitle>
            <NeonSmartList
                list={{
                    Description: decorator.description || '',
                }}
                editableValue
                onChange={(newInfo: Record<string, string>) => this.setState({
                    decorator: {
                        ...decorator,
                        description: newInfo.Description,
                    },
                })}
            />
        </React.Fragment>);
    }

    private _renderAddableGroup() {

        const decorator = this.state.decorator as SingleDecoratorResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Addable Groups</NeonTitle>
            <NeonPillGroup
                style={{ flexWrap: 'wrap' }}
                selected={decorator.addableGroups || []}
                onChange={(next: string[]) => {
                    this.setState({
                        decorator: {
                            ...decorator,
                            addableGroups: next,
                        },
                    });
                }}
                addable
                removable
                options={this.state.groups}
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

        if (!this.state.decorator) {
            return;
        }

        this.setState({
            loading: true,
            cover: undefined,
        });

        try {

            const name: string = await updateDecoratorRepository({
                name: this.state.decorator.name,
                description: this.state.decorator.description || undefined,
                addableGroups: this.state.decorator.addableGroups,
                removableGroups: this.state.decorator.removableGroups,
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

    private _getDecoratorName(): string {

        const params: any = this.props.match.params;
        return params.decorator;
    }
}
