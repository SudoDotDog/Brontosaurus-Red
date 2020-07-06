/**
 * @author WMXPY
 * @namespace Group
 * @description Group
 */

import { Dump } from "@sudoo/dump";
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

const searchKeywordCache: Dump<string> = Dump.create('group-search-keyword-cache', '');
const searchPageCache: Dump<number> = Dump.create('group-search-page-cache', 0);

export class GroupBase extends React.Component<ConnectedProps, GroupStates> {

    public readonly state: GroupStates = {

        groups: [],
        keyword: searchKeywordCache.value,
        pages: 0,
        page: searchPageCache.value,
    };

    private _mounted: boolean = false;
    private readonly _defaultValue: string = searchKeywordCache.value;

    public componentDidMount() {
        this._mounted = true;
        this._searchGroup();
    }

    public componentWillUnmount() {
        this._mounted = false;
    }

    public render() {

        return (
            <div>
                <SearchNew
                    defaultValue={this._defaultValue}
                    label="Group"
                    onSearch={(keyword: string) => {
                        searchKeywordCache.replace(keyword);
                        searchPageCache.replace(0);
                        this.setState({ keyword, page: 0 }, () => {
                            this._searchGroup();
                        });
                    }}
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
                    onClick={(page: number) => {
                        searchPageCache.replace(page);
                        this.setState({ page }, () => {
                            this._searchGroup();
                        });
                    }}
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
                        red={!group.active}
                    >
                        {group.name}
                    </ClickableSpan>
                </td>
                <td>{group.description}</td>
                <td>{group.decorators}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/admin/group/more/' + encodeURIComponent(group.name))}
                    size={SIZE.RELATIVE}>
                    {this.props.language.get(PROFILE.MORE)}
                </NeonButton></td>
            </tr>),
        );
    }

    private async _searchGroup() {

        const response: FetchGroupResponse = await fetchGroup(
            this.state.keyword,
            this.state.page,
        );

        if (this._mounted) {
            this.setState({
                groups: response.groups,
                pages: response.pages,
            });
        }
    }
}

export const Group: React.ComponentType<unknown> = connector.connect(GroupBase);
