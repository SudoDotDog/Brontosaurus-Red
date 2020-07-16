/**
 * @author WMXPY
 * @namespace Group
 * @description Members
 */

import { SudooFormat } from "@sudoo/internationalization";
import { MARGIN } from "@sudoo/neon/declare";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTable } from "@sudoo/neon/table";
import { NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { PageSelector } from "../components/page-selector";
import { intl } from "../i18n/intl";
import { IStore } from "../state/declare";
import { buildAdminAccountEdit } from "../util/path";
import { fetchGroupMembers, GroupMemberElement, GroupMemberResponse } from "./repository/members";

export type GroupMembersStates = {

    readonly loading: boolean;

    readonly groups: GroupMemberElement[];
    readonly pages: number;
    readonly page: number;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type GroupMembersProps = RouteComponentProps & ConnectedStates;

export class GroupMembersBase extends React.Component<GroupMembersProps, GroupMembersStates> {

    public readonly state: GroupMembersStates = {

        loading: false,

        groups: [],
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
                <NeonTitle margin={MARGIN.SMALL}>{this._getGroupName()}&#39;s Member</NeonTitle>

                {this.state.groups.length === 0
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

        return this.state.groups.map((member: GroupMemberElement) => {

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

        const group: string = this._getGroupName();

        const response: GroupMemberResponse = await fetchGroupMembers(
            group,
            this.state.page,
        );
        this.setState({
            groups: response.members,
            pages: response.pages,
        });
    }
    private _getGroupName(): string {

        const params: any = this.props.match.params;
        return params.group;
    }
}

export const GroupMembers: React.ComponentType = connector.connect(GroupMembersBase);
