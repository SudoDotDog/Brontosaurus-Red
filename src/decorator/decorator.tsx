/**
 * @author WMXPY
 * @namespace Decorator
 * @description Decorator
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
import { buildAdminDecoratorEdit, buildAdminDecoratorMore } from "../util/path";
import { TitleManager } from "../util/title";
import { DecoratorResponse, fetchDecorator, FetchDecoratorResponse } from "./repository/decorator-fetch";

export type DecoratorState = {

    readonly decorators: DecoratorResponse[];
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

const searchKeywordCache: Dump<string> = Dump.create('decorator-search-keyword-cache', '');
const searchPageCache: Dump<number> = Dump.create('decorator-search-page-cache', 0);

export class DecoratorBase extends React.Component<ConnectedProps, DecoratorState> {

    public readonly state: DecoratorState = {

        decorators: [],
        keyword: searchKeywordCache.value,
        pages: 0,
        page: searchPageCache.value,
    };

    private _mounted: boolean = false;
    private readonly _defaultValue: string = searchKeywordCache.value;

    public componentDidMount() {

        TitleManager.setSubPage(PROFILE.DECORATOR);

        this._mounted = true;
        this._searchDecorator();
    }

    public componentWillUnmount() {

        this._mounted = false;
        TitleManager.restore();
    }

    public render() {

        return (
            <div>
                <SearchNew
                    defaultValue={this._defaultValue}
                    label={this.props.language.get(PROFILE.DECORATOR)}
                    onSearch={(keyword: string) => {

                        searchKeywordCache.replace(keyword);
                        searchPageCache.replace(0);
                        this.setState({
                            keyword,
                            page: 0,
                        }, () => {
                            this._searchDecorator();
                        });
                    }}
                    onNew={() => this.props.history.push('/admin/decorator/create')}
                />
                {this.state.decorators.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            this.props.language.get(PROFILE.NAME),
                            this.props.language.get(PROFILE.DESCRIPTION),
                            this.props.language.get(PROFILE.ACTION),
                        ]}
                        style={{
                            marginTop: '1rem',
                        }}>
                        {this._renderDecorator()}
                    </NeonTable>}
                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => {

                        searchPageCache.replace(page);
                        this.setState({
                            page,
                        }, () => {
                            this._searchDecorator();
                        });
                    }}
                />
            </div>

        );
    }

    private _renderDecorator(): JSX.Element[] {

        return this.state.decorators.map((decorator: DecoratorResponse) => {

            return (<tr key={decorator.name}>
                <td>
                    <ClickableSpan
                        to={buildAdminDecoratorEdit(decorator.name)}
                        red={!decorator.active}
                    >
                        {decorator.name}
                    </ClickableSpan>
                </td>
                <td>{decorator.description}</td>
                <td><NeonButton
                    onClick={() => {
                        this.props.history.push(
                            buildAdminDecoratorMore(decorator.name),
                        );
                    }}
                    size={SIZE.RELATIVE}
                >
                    {this.props.language.get(PROFILE.MORE)}
                </NeonButton></td>
            </tr >);
        });
    }

    private async _searchDecorator() {

        const response: FetchDecoratorResponse = await fetchDecorator(
            this.state.keyword,
            this.state.page,
        );

        if (this._mounted) {
            this.setState({
                decorators: response.decorators,
                pages: response.pages,
            });
        }
    }
}

export const Decorator: React.ComponentType<unknown> = connector.connect(DecoratorBase);
