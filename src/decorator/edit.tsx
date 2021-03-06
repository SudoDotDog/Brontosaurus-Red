/**
 * @author WMXPY
 * @namespace Decorator
 * @description Edit
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
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
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { buildAdminGroupEdit } from "../util/path";
import { TitleManager } from "../util/title";
import { singleDecorator, SingleDecoratorResponse } from "./repository/single";
import { updateDecoratorRepository } from "./repository/update";

type DecoratorEditState = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
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

        const decoratorName: string = this._getDecoratorName();
        TitleManager.setNestedPage(PROFILE.DECORATOR, PROFILE.EDIT, decoratorName);

        const response: SingleDecoratorResponse = await singleDecorator(decoratorName);
        const groups: AllGroupsResponse[] = await fetchAllGroups();

        this.setState({
            decorator: response,
            groups: groups.map((res: AllGroupsResponse) => res.name),
        });
    }

    public componentWillUnmount(): void {

        TitleManager.restore();
    }

    public render() {

        return (
            <div>
                <GoBack
                    right={this.props.language.get(PROFILE.MORE)}
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
                    <NamedTitle about={this.props.language.get(
                        PROFILE.EDITING,
                        this.props.language.get(PROFILE.DECORATOR)
                    )}>
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
                        {this.props.language.get(PROFILE.SAVE_CHANGE)}
                    </NeonButton>
                </NeonIndicator>
            </NeonThemeProvider>
        );
    }

    private _renderDescription() {

        const decorator = this.state.decorator as SingleDecoratorResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.DESCRIPTION)}
            </NeonTitle>
            <NeonSmartList
                name={this.props.language.get(PROFILE.KEY)}
                value={this.props.language.get(PROFILE.VALUE)}
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

            const decoratorName: string = await updateDecoratorRepository({
                name: this.state.decorator.name,
                description: this.state.decorator.description,
                addableGroups: this.state.decorator.addableGroups,
                removableGroups: this.state.decorator.removableGroups,
            });

            this.setState({
                cover: createSucceedCover(
                    this.props.language,
                    decoratorName,
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

    private _getDecoratorName(): string {

        const params: any = this.props.match.params;
        return params.decorator;
    }
}

export const DecoratorEdit: React.ComponentType = connector.connect(DecoratorEditBase);
