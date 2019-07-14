/**
 * @author WMXPY
 * @namespace Organization
 * @description Edit
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker } from "@sudoo/neon/flag";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSmartList, NeonTable } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AllDecoratorsResponse, fetchAllDecorators } from "../common/repository/all-decorator";
import { AllTagsResponse, fetchAllTags } from "../common/repository/all-tag";
import { ClickableSpan } from "../components/clickable-span";
import { NamedTitle } from "../components/named-title";
import { singleOrganization, SingleOrganizationResponse } from "./repository/single";
import { updateOrganizationRepository } from "./repository/update";

type OrganizationEditProp = {
} & RouteComponentProps;

type OrganizationEditState = {

    readonly loading: boolean;
    readonly cover: any;
    readonly organization: SingleOrganizationResponse | null;
    readonly decorators: string[];
    readonly tags: string[];
};

export class OrganizationEdit extends React.Component<OrganizationEditProp, OrganizationEditState> {

    public readonly state: OrganizationEditState = {

        loading: false,
        cover: undefined,
        organization: null,
        decorators: [],
        tags: [],
    };

    public constructor(props: OrganizationEditProp) {

        super(props);

        this._submit = this._submit.bind(this);
    }

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
                <NeonSub onClick={() => this.props.history.goBack()}>Go Back</NeonSub>
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
                    {this._renderOwner()}
                    {this._renderMembers()}
                    {this._renderDecorators()}
                    {this._renderTags()}
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

    private _renderOwner() {

        const organization = this.state.organization as SingleOrganizationResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Owner Information</NeonTitle>
            <NeonSmartList
                list={{
                    Username: organization.owner.username,
                    Phone: organization.owner.phone,
                    Email: organization.owner.email,
                }}
            />
        </React.Fragment>);
    }

    private _renderMembers() {

        const organization = this.state.organization as SingleOrganizationResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Members Information</NeonTitle>
            <NeonTable
                headers={['Username', 'Phone', 'Email']}
                style={{ marginTop: '1rem' }}>
                {organization.members.map((member) => (<tr key={member.username}>
                    <td>
                        <ClickableSpan
                            onClick={() => this.props.history.push('/admin/user/e/' + encodeURIComponent(member.username))}
                        >
                            {member.username}
                        </ClickableSpan>
                        {member.username === organization.owner.username && <span style={{ color: 'red' }}>&nbsp;(Owner)</span>}
                    </td>
                    <td>{member.phone}</td>
                    <td>{member.email}</td>
                </tr>))}
            </NeonTable>
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

    private _getOrganizationName(): string {

        const params: any = this.props.match.params;
        return params.organization;
    }
}
