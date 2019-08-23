/**
 * @author WMXPY
 * @namespace Decorator
 * @description Decorator
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

export class DecoratorBase extends React.Component<ConnectedProps, DecoratorState> {

    public readonly state: DecoratorState = {

        decorators: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public constructor(props: ConnectedProps) {

        super(props);
        this._searchDecorator = this._searchDecorator.bind(this);
    }

    public render() {

        return (
            <div>
                <SearchNew
                    label="Decorator"
                    onSearch={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchDecorator)}
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
                        style={{ marginTop: '1rem' }}>
                        {this._renderDecorator()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, this._searchDecorator)}
                />
            </div>

        );
    }

    private _renderDecorator(): JSX.Element[] {

        return this.state.decorators.map((decorator: DecoratorResponse) =>
            (<tr key={decorator.name}>
                <td>
                    <ClickableSpan
                        to={'/admin/decorator/e/' + encodeURIComponent(decorator.name)}
                    >
                        {decorator.name}
                    </ClickableSpan>
                </td>
                <td>{decorator.description}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/admin/decorator/e/' + encodeURIComponent(decorator.name))}
                    size={SIZE.RELATIVE}>
                    {this.props.language.get(PROFILE.EDIT)}
                </NeonButton></td>
            </tr>),
        );
    }

    private async _searchDecorator() {

        const response: FetchDecoratorResponse = await fetchDecorator(
            this.state.keyword,
            this.state.page,
        );
        this.setState({
            decorators: response.decorators,
            pages: response.pages,
        });
    }
}

export const Decorator: React.ComponentType<{}> = connector.connect(DecoratorBase);
