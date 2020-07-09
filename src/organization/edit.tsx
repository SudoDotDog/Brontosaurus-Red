/**
 * @author WMXPY
 * @namespace Organization
 * @description Edit
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker } from "@sudoo/neon/flag";
import { NeonPair } from "@sudoo/neon/input";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSmartList } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AllDecoratorsResponse, fetchAllDecorators } from "../common/repository/all-decorator";
import { AllTagsResponse, fetchAllTags } from "../common/repository/all-tag";
import { ActiveStatus } from "../components/active-status";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { IStore } from "../state/declare";
import { buildAdminAccountEdit, buildAdminDecoratorEdit, buildAdminNamespaceEdit, buildAdminOrganizationMore, buildAdminTagEdit } from "../util/path";
import { singleOrganization, SingleOrganizationResponse } from "./repository/single";
import { updateOrganizationRepository } from "./repository/update";

type OrganizationEditState = {

    readonly loading: boolean;
    readonly cover: any;
    readonly organization: SingleOrganizationResponse | null;
    readonly decorators: string[];
    readonly tags: string[];
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type OrganizationEditProp = RouteComponentProps & ConnectedStates;

export class OrganizationEditBase extends React.Component<OrganizationEditProp, OrganizationEditState> {

    public readonly state: OrganizationEditState = {

        loading: false,
        cover: undefined,
        organization: null,
        decorators: [],
        tags: [],
    };

    public async componentDidMount() {

        const response: SingleOrganizationResponse = await singleOrganization(this._getOrganizationName());
        const decorators: AllDecoratorsResponse[] = await fetchAllDecorators();
        const tags: AllTagsResponse[] = await fetchAllTags();

        this.setState({
            organization: response,
            decorators: decorators.map((res: AllDecoratorsResponse) => res.name),
            tags: tags.map((res: AllTagsResponse) => res.name),
        });
    }

    public render() {

        return (
            <div>
                <GoBack
                    right="More"
                    onClickRight={() => {
                        this.props.history.push(buildAdminOrganizationMore(this._getOrganizationName()));
                    }}
                />
                {this._renderEditableInfos()}
            </div>
        );
    }

    private _renderEditableInfos() {

        if (!this.state.organization) {
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
                    <NamedTitle about="Editing Organization">
                        {this.state.organization.name}
                    </NamedTitle>
                    <ActiveStatus
                        active={this.state.organization.active}
                    />
                    {this._renderOwner()}
                    {this._renderLimit()}
                    {this._renderDecorators()}
                    {this._renderTags()}
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

    private _renderOwner() {

        const organization = this.state.organization as SingleOrganizationResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Owner Information</NeonTitle>
            <NeonSmartList
                list={{
                    Namespace: (<ClickableSpan
                        to={buildAdminNamespaceEdit(organization.owner.namespace)}
                        red={!organization.owner.namespaceActive}
                    >
                        {organization.owner.namespace}
                    </ClickableSpan> as any),
                    Username: (<ClickableSpan
                        to={buildAdminAccountEdit(organization.owner.username, organization.owner.namespace)}
                        red={!organization.owner.active}
                    >
                        {organization.owner.username}
                    </ClickableSpan> as any),
                    Phone: organization.owner.phone,
                    Email: organization.owner.email,
                }}
            />
        </React.Fragment>);
    }

    private _renderLimit() {

        const organization = this.state.organization as SingleOrganizationResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Account Limit</NeonTitle>
            <NeonPair
                label="Used"
                value={organization.members.length.toString()}
            />
            <NeonPair
                label="Limit"
                editable
                value={organization.limit.toString()}
                onChange={(value: string) => this.setState({
                    organization: {
                        ...organization,
                        limit: Number(value) || organization.limit,
                    },
                })}
            />
        </React.Fragment>);
    }

    private _renderDecorators() {

        const organization = this.state.organization as SingleOrganizationResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Decorators</NeonTitle>
            <NeonPillGroup
                style={{ flexWrap: 'wrap' }}
                selected={organization.decorators || []}
                onChange={(next: string[]) => {
                    this.setState({
                        organization: {
                            ...organization,
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

    private _renderTags() {

        const organization = this.state.organization as SingleOrganizationResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Tags</NeonTitle>
            <NeonPillGroup
                style={{ flexWrap: 'wrap' }}
                selected={organization.tags || []}
                onChange={(next: string[]) => {
                    this.setState({
                        organization: {
                            ...organization,
                            tags: next,
                        },
                    });
                }}
                render={(value: string) => {
                    return (<ClickableSpan
                        to={buildAdminTagEdit(value)}
                    >
                        {value}
                    </ClickableSpan>);
                }}
                addable
                removable
                options={this.state.tags}
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

        if (!this.state.organization) {
            return;
        }

        this.setState({
            loading: true,
            cover: undefined,
        });

        try {

            const name: string = await updateOrganizationRepository({
                name: this.state.organization.name,
                limit: this.state.organization.limit,
                decorators: this.state.organization.decorators,
                tags: this.state.organization.tags,
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

    private _getOrganizationName(): string {

        const params: any = this.props.match.params;
        return params.organization;
    }
}

export const OrganizationEdit: React.ComponentType = connector.connect(OrganizationEditBase);
