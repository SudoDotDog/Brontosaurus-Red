/**
 * @author WMXPY
 * @namespace Organization
 * @description Members
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE } from "@sudoo/neon/declare";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTable } from "@sudoo/neon/table";
import { NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { PageSelector } from "../components/page-selector";
import { buildAdminAccountEdit } from "../util/path";
import { fetchOrganizationMembers, OrganizationMemberElement, OrganizationMemberOwner, OrganizationMemberResponse } from "./repository/member";
import { setOwnerRepository } from "./repository/set-owner";

export type OrganizationMembersProps = {
} & RouteComponentProps;

export type OrganizationMembersStates = {

    readonly loading: boolean;

    readonly members: OrganizationMemberElement[];
    readonly owner: OrganizationMemberOwner | null;
    readonly pages: number;
    readonly page: number;
};

export class OrganizationMembers extends React.Component<OrganizationMembersProps, OrganizationMembersStates> {

    public readonly state: OrganizationMembersStates = {

        loading: false,

        members: [],
        owner: null,
        pages: 0,
        page: 0,
    };

    public componentDidMount() {

        this._fetchOrganization();
    }

    public render() {

        return (
            <NeonIndicator
                loading={this.state.loading}
            >
                <GoBack />
                <NeonTitle margin={MARGIN.SMALL}>{this._getOrganization()}&#39;s Member</NeonTitle>

                {this.state.members.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            'Namespace',
                            'Username',
                            'Display',
                            'Phone',
                            'Email',
                            'Action',
                        ]}
                        style={{ marginTop: '1rem' }}>
                        {this._renderMembers()}
                    </NeonTable>}
                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, () => {
                        this._fetchOrganization();
                    })}
                />
            </NeonIndicator>
        );
    }

    private _renderMembers(): JSX.Element[] {

        return this.state.members.map((member: OrganizationMemberElement) => {

            const isOwner: boolean = this._isOwner(member);
            return (<tr key={member.username}>
                <td>{member.namespace}</td>
                <td>
                    <ClickableSpan
                        to={buildAdminAccountEdit(member.username, member.namespace)}
                        red={!member.active}
                    >
                        {member.username}
                    </ClickableSpan>
                    {isOwner && <span style={{ color: 'red' }}>&nbsp;(Owner)</span>}
                </td>
                <td>{member.displayName}</td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td>{isOwner
                    ? 'None'
                    : (<NeonButton
                        className={MenuStyle.actionButton}
                        style={{ margin: '2px' }}
                        onClick={() => this._promoteUser(member.username, member.namespace)}
                        size={SIZE.RELATIVE}>
                        Promote
                    </NeonButton>)}
                </td>
            </tr>);
        });
    }

    private _isOwner(member: OrganizationMemberElement): boolean {

        if (this.state.owner === null) {
            return false;
        }

        return member.username === this.state.owner.username
            && member.namespace === this.state.owner.namespace;
    }


    private async _promoteUser(username: string, namespace: string): Promise<void> {

        const organization: string = this._getOrganization();
        const confirmed: boolean = window.confirm(`Are you sure to promote ${username} to the owner of ${organization}`);

        if (!confirmed) {
            return;
        }

        this.setState({
            loading: true,
        });

        try {

            await setOwnerRepository(username, namespace, organization);
            await this._fetchOrganization();
        } catch (err) {

            alert(err);
        } finally {

            this.setState({
                loading: false,
            });
        }
    }

    private async _fetchOrganization() {

        const organization: string = this._getOrganization();

        const response: OrganizationMemberResponse = await fetchOrganizationMembers(
            organization,
            this.state.page,
        );
        this.setState({
            members: response.members,
            owner: response.owner,
            pages: response.pages,
        });
    }

    private _getOrganization(): string {

        const params: any = this.props.match.params;
        return params.organization;
    }
}
