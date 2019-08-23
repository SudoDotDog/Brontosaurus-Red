/**
 * @author WMXPY
 * @namespace Group
 * @description Group
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonTable } from "@sudoo/neon/table";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ClickableSpan } from "../components/clickable-span";
import { PageSelector } from "../components/page-selector";
import { SearchNew } from "../components/search-new";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { fetchGroup, FetchGroupResponse, GroupResponse } from "./repository/group-fetch";

export type GroupStates = {

    readonly groups: GroupResponse[];
    readonly keyword: string;
    readonly pages: number;
    readonly page: number;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

type ConnectedProps = RouteComponentProps & ConnectedStates;

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export class GroupBase extends React.Component<ConnectedProps, GroupStates> {

    public readonly state: GroupStates = {

        groups: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public constructor(props: ConnectedProps) {

        super(props);
        this._searchGroup = this._searchGroup.bind(this);
    }

    public render() {

        return (
            <div>
                <SearchNew
                    label="Group"
                    onSearch={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchGroup)}
                    onNew={() => this.props.history.push('/admin/group/create')}
                />

                {this.state.groups.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            this.props.language.get(PROFILE.NAME),
                            this.props.language.get(PROFILE.DESCRIPTION),
                            this.props.language.get(PROFILE.DECORATORS),
                            this.props.language.get(PROFILE.ACTION),
                        ]}
                        style={{ marginTop: '1rem' }}>
                        {this._renderGroup()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, this._searchGroup)}
                />
            </div>

        );
    }

    private _renderGroup(): JSX.Element[] {

        return this.state.groups.map((group: GroupResponse) =>
            (<tr key={group.name}>
                <td>
                    <ClickableSpan
                        to={'/admin/group/e/' + encodeURIComponent(group.name)}
                    >
                        {group.name}
                    </ClickableSpan>
                </td>
                <td>{group.description}</td>
                <td>{group.decorators}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/admin/group/e/' + encodeURIComponent(group.name))}
                    size={SIZE.RELATIVE}>
                    {this.props.language.get(PROFILE.EDIT)}
                </NeonButton></td>
            </tr>),
        );
    }

    private async _searchGroup() {

        const response: FetchGroupResponse = await fetchGroup(
            this.state.keyword,
            this.state.page,
        );
        this.setState({
            groups: response.groups,
            pages: response.pages,
        });
    }
}

export const Group: React.ComponentType<{}> = connector.connect(GroupBase);
