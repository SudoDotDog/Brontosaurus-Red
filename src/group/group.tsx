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
import { SearchNew } from "../components/search-new";
import { fetchGroup, GroupResponse } from "./repository/group-fetch";

type GroupProp = {
} & RouteComponentProps;

type GroupState = {

    groups: GroupResponse[];
};

export class Group extends React.Component<GroupProp, GroupState> {

    public state: GroupState = {
        groups: [],
    };

    public render() {

        return (
            <div>

                <SearchNew
                    label="Group"
                    onSearch={async (keyword: string) => this.setState({ groups: await fetchGroup(keyword) })}
                    onNew={() => this.props.history.push('/group/create')}
                />

                {this.state.groups.length === 0
                    ? void 0
                    : <NeonTable
                        headers={['Name', 'Description', 'Action']}
                        style={{ marginTop: '1rem' }}>
                        {this._renderGroup()}
                    </NeonTable>}
            </div>

        );
    }

    private _renderGroup(): JSX.Element[] {

        return this.state.groups.map((group: GroupResponse) =>
            (<tr key={group.name}>
                <td>{group.name}</td>
                <td>{group.description}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/group/e/' + group.name)}
                    size={SIZE.RELATIVE}>
                    Edit
                </NeonButton></td>
            </tr>),
        );
    }
}
