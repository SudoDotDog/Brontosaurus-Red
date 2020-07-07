/**
 * @author WMXPY
 * @namespace Namespace
 * @description Namespace
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
import { fetchNamespace, FetchNamespaceResponse, NamespaceResponse } from "./repository/namespace-fetch";

export type NamespaceState = {

    readonly namespaces: NamespaceResponse[];
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

const searchKeywordCache: Dump<string> = Dump.create('namespace-search-keyword-cache', '');
const searchPageCache: Dump<number> = Dump.create('namespace-search-page-cache', 0);

export class NamespaceBase extends React.Component<ConnectedProps, NamespaceState> {

    public readonly state: NamespaceState = {

        namespaces: [],
        keyword: searchKeywordCache.value,
        pages: 0,
        page: searchPageCache.value,
    };

    private readonly _defaultValue: string = searchKeywordCache.value;

    public componentDidMount() {
        this._searchNamespace();
    }

    public render() {

        return (
            <div>
                <SearchNew
                    defaultValue={this._defaultValue}
                    label="Namespace"
                    onSearch={(keyword: string) => {
                        searchKeywordCache.replace(keyword);
                        searchPageCache.replace(0);
                        this.setState({ keyword, page: 0 }, () => {
                            this._searchNamespace();
                        });
                    }}
                    onNew={() => this.props.history.push('/admin/namespace/create')}
                />

                {this.state.namespaces.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            this.props.language.get(PROFILE.NAMESPACE),
                            this.props.language.get(PROFILE.DOMAIN),
                            this.props.language.get(PROFILE.NAME),
                            this.props.language.get(PROFILE.ACTION),
                        ]}
                        style={{ marginTop: '1rem' }}>
                        {this._renderNamespace()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => {
                        searchPageCache.replace(page);
                        this.setState({ page }, () => {
                            this._searchNamespace();
                        });
                    }}
                />
            </div>

        );
    }

    private _renderNamespace(): JSX.Element[] {

        return this.state.namespaces.map((namespace: NamespaceResponse) =>
            (<tr key={namespace.name}>
                <td>
                    <ClickableSpan
                        to={'/admin/namespace/e/' + encodeURIComponent(namespace.namespace)}
                        red={!namespace.active}
                    >
                        {namespace.namespace}
                    </ClickableSpan>
                </td>
                <td>{namespace.domain}</td>
                <td>{namespace.name}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/admin/namespace/more/' + encodeURIComponent(namespace.namespace))}
                    size={SIZE.RELATIVE}>
                    {this.props.language.get(PROFILE.MORE)}
                </NeonButton></td>
            </tr>),
        );
    }

    private async _searchNamespace() {

        const response: FetchNamespaceResponse = await fetchNamespace(
            this.state.keyword,
            this.state.page,
        );
        this.setState({
            namespaces: response.namespaces,
            pages: response.pages,
        });
    }
}

export const Namespace: React.ComponentType<unknown> = connector.connect(NamespaceBase);
