/**
 * @author WMXPY
 * @namespace Decorator
 * @description Edit
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker } from "@sudoo/neon/flag";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSmartList } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AllGroupsResponse, fetchAllGroups } from "../common/repository/all-group";
import { ActiveStatus } from "../components/active-status";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { IStore } from "../state/declare";
import { buildAdminGroupEdit } from "../util/path";
import { singleDecorator, SingleDecoratorResponse } from "./repository/single";
import { updateDecoratorRepository } from "./repository/update";

type DecoratorEditState = {

    readonly loading: boolean;
    readonly cover: any;
    readonly decorator: SingleDecoratorResponse | null;
    readonly groups: string[];
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type DecoratorEditProp = RouteComponentProps & ConnectedStates;

export class DecoratorEditBase extends React.Component<DecoratorEditProp, DecoratorEditState> {

    public readonly state: DecoratorEditState = {

        loading: false,
        cover: undefined,
        decorator: null,
        groups: [],
    };

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
                <GoBack
                    right="More"
                    onClickRight={() => this.props.history.push('/admin/decorator/more/' + encodeURIComponent(this._getDecoratorName()))}
                />
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
                    <NamedTitle about="Editing Decorator">
                        {this.state.decorator.name}
                    </NamedTitle>
                    <ActiveStatus
                        active={this.state.decorator.active}
                    />
                    {this._renderDescription()}
                    <NeonButton
                        size={SIZE.MEDIUM}
                        width={WIDTH.FULL}
                        onClick={this._submit.bind(this)}>
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
                render={(value: string) => {
                    return (<ClickableSpan
                        to={buildAdminGroupEdit(value)}
                    >
                        {value}
                    </ClickableSpan>);
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
                description: this.state.decorator.description,
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

export const DecoratorEdit: React.ComponentType = connector.connect(DecoratorEditBase);
