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
import { AllDecoratorsResponse, fetchAllDecorators } from "../common/repository/all-decorator";
import { ActiveStatus } from "../components/active-status";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { IStore } from "../state/declare";
import { buildAdminDecoratorEdit } from "../util/path";
import { singleGroup, SingleGroupResponse } from "./repository/single";
import { updateGroupRepository } from "./repository/update";

type GroupEditState = {

    readonly loading: boolean;
    readonly cover: any;
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

        const response: SingleGroupResponse = await singleGroup(this._getGroupName());
        const decorators: AllDecoratorsResponse[] = await fetchAllDecorators();

        this.setState({
            group: response,
            decorators: decorators.map((res: AllDecoratorsResponse) => res.name),
        });
    }

    public render() {

        return (
            <div>
                <GoBack
                    right="More"
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
                    <NamedTitle about="Editing Group">
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
                        Save Change
                    </NeonButton>
                </NeonIndicator>
            </NeonThemeProvider>
        );
    }

    private _renderDescription() {

        const group = this.state.group as SingleGroupResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Description</NeonTitle>
            <NeonSmartList
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
            <NeonTitle size={SIZE.MEDIUM}>Decorators</NeonTitle>
            <NeonPillGroup
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

    private _getGroupName(): string {

        const params: any = this.props.match.params;
        return params.group;
    }
}

export const GroupEdit: React.ComponentType = connector.connect(GroupEditBase);
