/**
 * @author WMXPY
 * @namespace Group
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
import { AllDecoratorsResponse, fetchAllDecorators } from "../common/repository/all-decorator";
import { ActiveStatus } from "../components/active-status";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { buildAdminDecoratorEdit } from "../util/path";
import { TitleManager } from "../util/title";
import { singleGroup, SingleGroupResponse } from "./repository/single";
import { updateGroupRepository } from "./repository/update";

type GroupEditState = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly group: SingleGroupResponse | null;
    readonly decorators: string[];
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type GroupEditProp = RouteComponentProps & ConnectedStates;

export class GroupEditBase extends React.Component<GroupEditProp, GroupEditState> {

    public readonly state: GroupEditState = {

        loading: false,
        cover: undefined,
        group: null,
        decorators: [],
    };

    public async componentDidMount() {

        const groupName: string = this._getGroupName();
        TitleManager.setNestedPage(PROFILE.GROUP, PROFILE.EDIT, groupName);

        const response: SingleGroupResponse = await singleGroup(groupName);
        const decorators: AllDecoratorsResponse[] = await fetchAllDecorators();

        this.setState({
            group: response,
            decorators: decorators.map((res: AllDecoratorsResponse) => res.name),
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
                    onClickRight={() => this.props.history.push('/admin/group/more/' + encodeURIComponent(this._getGroupName()))}
                />
                {this._renderEditableInfos()}
            </div>
        );
    }

    private _renderEditableInfos() {

        if (!this.state.group) {
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
                        this.props.language.get(PROFILE.GROUP),
                    )}>
                        {this.state.group.name}
                    </NamedTitle>
                    <ActiveStatus
                        active={this.state.group.active}
                    />
                    {this._renderDescription()}
                    {this._renderDecorators()}
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

        const group = this.state.group as SingleGroupResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.DESCRIPTION)}
            </NeonTitle>
            <NeonSmartList
                name={this.props.language.get(PROFILE.KEY)}
                value={this.props.language.get(PROFILE.VALUE)}
                list={{
                    Description: group.description || '',
                }}
                editableValue
                onChange={(newInfo: Record<string, string>) => this.setState({
                    group: {
                        ...group,
                        description: newInfo.Description,
                    },
                })}
            />
        </React.Fragment>);
    }

    private _renderDecorators() {

        const group = this.state.group as SingleGroupResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.DECORATORS)}
            </NeonTitle>
            <NeonPillGroup
                addText={this.props.language.get(PROFILE.ADD_INDICATOR)}
                style={{ flexWrap: 'wrap' }}
                selected={group.decorators || []}
                onChange={(next: string[]) => {
                    this.setState({
                        group: {
                            ...group,
                            decorators: next,
                        },
                    });
                }}
                render={(value: string) => {
                    return (<ClickableSpan
                        to={buildAdminDecoratorEdit(value)}
                    >
                        {value}
                    </ClickableSpan>);
                }}
                addable
                removable
                options={this.state.decorators}
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

        if (!this.state.group) {
            return;
        }

        this.setState({
            loading: true,
            cover: undefined,
        });

        try {

            const name: string = await updateGroupRepository({
                name: this.state.group.name,
                description: this.state.group.description,
                decorators: this.state.group.decorators,
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

    private _getGroupName(): string {

        const params: any = this.props.match.params;
        return params.group;
    }
}

export const GroupEdit: React.ComponentType = connector.connect(GroupEditBase);
