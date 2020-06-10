/**
 * @author WMXPY
 * @namespace Tags
 * @description Tags
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
import { fetchTagRepository, FetchTagResponse, TagResponse } from "./repository/tag-fetch";

export type TagsState = {

    readonly tags: TagResponse[];
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

const searchKeywordCache: Dump<string> = Dump.create('tag-search-keyword-cache', '');
const searchPageCache: Dump<number> = Dump.create('tag-search-page-cache', 0);

export class TagsBase extends React.Component<ConnectedProps, TagsState> {

    public readonly state: TagsState = {

        tags: [],
        keyword: searchKeywordCache.value,
        pages: 0,
        page: searchPageCache.value,
    };

    private readonly _defaultValue: string = searchKeywordCache.value;

    public componentDidMount() {
        this._searchTags();
    }

    public render() {

        return (
            <div>
                <SearchNew
                    defaultValue={this._defaultValue}
                    label="Tags"
                    onSearch={(keyword: string) => {
                        searchKeywordCache.replace(keyword);
                        searchPageCache.replace(0);
                        this.setState({ keyword, page: 0 }, () => {
                            this._searchTags();
                        });
                    }}
                    onNew={() => this.props.history.push('/admin/tag/create')}
                />

                {this.state.tags.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            this.props.language.get(PROFILE.NAME),
                            this.props.language.get(PROFILE.DESCRIPTION),
                            this.props.language.get(PROFILE.ACTION),
                        ]}
                        style={{ marginTop: '1rem' }}>
                        {this._renderTags()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => {
                        searchPageCache.replace(page);
                        this.setState({ page }, () => {
                            this._searchTags();
                        });
                    }}
                />
            </div>

        );
    }

    private _renderTags(): JSX.Element[] {

        return this.state.tags.map((tag: TagResponse) =>
            (<tr key={tag.name}>
                <td>
                    <ClickableSpan
                        to={'/admin/tag/e/' + encodeURIComponent(tag.name)}
                    >
                        {tag.name}
                    </ClickableSpan>
                </td>
                <td>{tag.description}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/admin/tag/e/' + encodeURIComponent(tag.name))}
                    size={SIZE.RELATIVE}>
                    {this.props.language.get(PROFILE.EDIT)}
                </NeonButton></td>
            </tr>),
        );
    }

    private async _searchTags() {

        const response: FetchTagResponse = await fetchTagRepository(
            this.state.keyword,
            this.state.page,
        );
        this.setState({
            tags: response.tags,
            pages: response.pages,
        });
    }
}

export const Tags: React.ComponentType<unknown> = connector.connect(TagsBase);
