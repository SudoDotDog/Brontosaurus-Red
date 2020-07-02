/**
 * @author WMXPY
 * @namespace Tag
 * @description Members
 */

import { MARGIN } from "@sudoo/neon/declare";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTable } from "@sudoo/neon/table";
import { NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { PageSelector } from "../components/page-selector";
import { buildAdminAccountEdit } from "../util/path";
import { fetchTagMembers, TagMemberElement, TagMemberResponse } from "./repository/members";

export type TagMembersProps = {
} & RouteComponentProps;

export type TagMembersStates = {

    readonly loading: boolean;

    readonly tags: TagMemberElement[];
    readonly pages: number;
    readonly page: number;
};

export class TagMembers extends React.Component<TagMembersProps, TagMembersStates> {

    public readonly state: TagMembersStates = {

        loading: false,

        tags: [],
        pages: 0,
        page: 0,
    };

    public componentDidMount() {
        this._fetchMembers();
    }

    public render() {

        return (
            <NeonIndicator
                loading={this.state.loading}
            >
                <GoBack />
                <NeonTitle margin={MARGIN.SMALL}>{this._getTagName()}&#39;s Member</NeonTitle>

                {this.state.tags.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            'Namespace',
                            'Username',
                            'Display',
                            'Phone',
                            'Email',
                        ]}
                        style={{ marginTop: '1rem' }}>
                        {this._renderMembers()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, () => {
                        this._fetchMembers();
                    })}
                />
            </NeonIndicator>
        );
    }

    private _renderMembers(): JSX.Element[] {

        return this.state.tags.map((member: TagMemberElement) => {

            return (<tr key={member.username}>
                <td>{member.namespace}</td>
                <td>
                    <ClickableSpan
                        to={buildAdminAccountEdit(member.username, member.namespace)}
                        red={!member.active}
                    >
                        {member.username}
                    </ClickableSpan>
                </td>
                <td>{member.displayName}</td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
            </tr>);
        });
    }

    private async _fetchMembers() {

        const tag: string = this._getTagName();

        const response: TagMemberResponse = await fetchTagMembers(
            tag,
            this.state.page,
        );
        this.setState({
            tags: response.members,
            pages: response.pages,
        });
    }
    private _getTagName(): string {

        const params: any = this.props.match.params;
        return params.tag;
    }
}
