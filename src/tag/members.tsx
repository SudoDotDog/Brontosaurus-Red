/**
 * @author WMXPY
 * @namespace Tag
 * @description Members
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTable } from "@sudoo/neon/table";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { PageSelector } from "../components/page-selector";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { buildAdminAccountEdit } from "../util/path";
import { TitleManager } from "../util/title";
import { fetchTagMembers, TagMemberElement, TagMemberResponse } from "./repository/members";

export type TagMembersStates = {

    readonly loading: boolean;

    readonly members: TagMemberElement[];
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

export type TagMembersProps = RouteComponentProps & ConnectedStates;

export class TagMembersBase extends React.Component<TagMembersProps, TagMembersStates> {

    public readonly state: TagMembersStates = {

        loading: false,

        members: [],
        pages: 0,
        page: 0,
    };

    public componentDidMount() {

        const tagName: string = this._getTagName();
        TitleManager.setNestedPage(PROFILE.TAG, PROFILE.MEMBERS, tagName);

        this._fetchMembers();
    }

    public componentWillUnmount(): void {

        TitleManager.restore();
    }

    public render() {

        return (
            <NeonIndicator
                loading={this.state.loading}
            >
                <GoBack />
                <NamedTitle about={this.props.language.get(
                    PROFILE.MEMBER_OF_INSTANCE,
                    this.props.language.get(PROFILE.TAG),
                )}>
                    {this._getTagName()}
                </NamedTitle>
                {this.state.members.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            this.props.language.get(PROFILE.NAMESPACE),
                            this.props.language.get(PROFILE.USERNAME),
                            this.props.language.get(PROFILE.DISPLAY_NAME),
                            this.props.language.get(PROFILE.PHONE),
                            this.props.language.get(PROFILE.EMAIL),
                        ]}
                        style={{
                            marginTop: '1rem',
                        }}
                    >
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

        return this.state.members.map((member: TagMemberElement) => {

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
            members: response.members,
            pages: response.pages,
        });
    }
    private _getTagName(): string {

        const params: any = this.props.match.params;
        return params.tag;
    }
}

export const TagMembers: React.ComponentType = connector.connect(TagMembersBase);
