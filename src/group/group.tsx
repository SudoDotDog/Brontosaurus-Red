/**
 * @author WMXPY
 * @namespace Group
 * @description Group
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonTable } from "@sudoo/neon/table";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { PageSelector } from "../components/page-selector";
import { SearchNew } from "../components/search-new";
import { fetchGroup, FetchGroupResponse, GroupResponse } from "./repository/group-fetch";

export type GroupProps = {
} & RouteComponentProps;

export type GroupStates = {

    readonly groups: GroupResponse[];
    readonly keyword: string;
    readonly pages: number;
    readonly page: number;
};

export class Group extends React.Component<GroupProps, GroupStates> {

    public readonly state: GroupStates = {

        groups: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public constructor(props: GroupProps) {

        super(props);
        this._searchGroup = this._searchGroup.bind(this);
    }

    public render() {

        return (
            <div>
                <SearchNew
                    label="Group"
                    onSearch={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchGroup)}
                    onNew={() => this.props.history.push('/group/create')}
                />

                {this.state.groups.length === 0
                    ? void 0
                    : <NeonTable
                        headers={['Name', 'Description', 'Action']}
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
                <td>{group.name}</td>
                <td>{group.description}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/group/e/' + encodeURIComponent(group.name))}
                    size={SIZE.RELATIVE}>
                    Edit
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
