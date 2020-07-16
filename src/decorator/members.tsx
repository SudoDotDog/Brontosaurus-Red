/**
 * @author WMXPY
 * @namespace Decorator
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
import { DecoratorMemberElement, DecoratorMemberResponse, fetchDecoratorMembers } from "./repository/members";

export type DecoratorMembersStates = {

    readonly loading: boolean;

    readonly members: DecoratorMemberElement[];
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

export type DecoratorMembersProps = RouteComponentProps & ConnectedStates;

export class DecoratorMembersBase extends React.Component<DecoratorMembersProps, DecoratorMembersStates> {

    public readonly state: DecoratorMembersStates = {

        loading: false,

        members: [],
        pages: 0,
        page: 0,
    };

    public componentDidMount() {

        this._fetchDecorator();
    }

    public render() {

        return (
            <NeonIndicator
                loading={this.state.loading}
            >
                <GoBack />
                <NamedTitle about={this.props.language.get(
                    PROFILE.MEMBER_OF_INSTANCE,
                    this.props.language.get(PROFILE.DECORATOR),
                )}>
                    {this._getDecorator()}
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
                        this._fetchDecorator();
                    })}
                />
            </NeonIndicator>
        );
    }

    private _renderMembers(): JSX.Element[] {

        return this.state.members.map((member: DecoratorMemberElement) => {

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

    private async _fetchDecorator() {

        const decorator: string = this._getDecorator();

        const response: DecoratorMemberResponse = await fetchDecoratorMembers(
            decorator,
            this.state.page,
        );
        this.setState({
            members: response.members,
            pages: response.pages,
        });
    }

    private _getDecorator(): string {

        const params: any = this.props.match.params;
        return params.decorator;
    }
}

export const DecoratorMembers: React.ComponentType = connector.connect(DecoratorMembersBase);
