/**
 * @author WMXPY
 * @namespace Tags
 * @description Tags
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonTable } from "@sudoo/neon/table";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { PageSelector } from "../components/page-selector";
import { SearchNew } from "../components/search-new";
import { fetchTagRepository, FetchTagResponse, TagResponse } from "./repository/tag-fetch";

export type TagsProp = {
} & RouteComponentProps;

export type TagsState = {

    readonly tags: TagResponse[];
    readonly keyword: string;
    readonly pages: number;
    readonly page: number;
};

export class Tags extends React.Component<TagsProp, TagsState> {

    public readonly state: TagsState = {

        tags: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public constructor(props: TagsProp) {

        super(props);
        this._searchTags = this._searchTags.bind(this);
    }

    public render() {

        return (
            <div>
                <SearchNew
                    label="Tags"
                    onSearch={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchTags)}
                    onNew={() => this.props.history.push('/tag/create')}
                />

                {this.state.tags.length === 0
                    ? void 0
                    : <NeonTable
                        headers={['Name', 'Description', 'Action']}
                        style={{ marginTop: '1rem' }}>
                        {this._renderTags()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, this._searchTags)}
                />
            </div>

        );
    }

    private _renderTags(): JSX.Element[] {

        return this.state.tags.map((tag: TagResponse) =>
            (<tr key={tag.name}>
                <td>{tag.name}</td>
                <td>{tag.description}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/tag/e/' + encodeURIComponent(tag.name))}
                    size={SIZE.RELATIVE}>
                    Edit
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
