/**
 * @author WMXPY
 * @namespace Decorator
 * @description Decorator
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonTable } from "@sudoo/neon/table";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SearchNew } from "../components/search-new";
import { DecoratorResponse, fetchDecorator } from "./repository/decorator-fetch";

type DecoratorProp = {
} & RouteComponentProps;

type DecoratorState = {

    decorators: DecoratorResponse[];
};

export class Decorator extends React.Component<DecoratorProp, DecoratorState> {

    public state: DecoratorState = {
        decorators: [],
    };

    public render() {

        return (
            <div>

                <SearchNew
                    label="Decorator"
                    onSearch={async (keyword: string) => this.setState({ decorators: await fetchDecorator(keyword) })}
                    onNew={() => this.props.history.push('/decorator/create')}
                />

                {this.state.decorators.length === 0
                    ? void 0
                    : <NeonTable
                        headers={['Name', 'Description', 'Action']}
                        style={{ marginTop: '1rem' }}>
                        {this._renderDecorator()}
                    </NeonTable>}
            </div>

        );
    }

    private _renderDecorator(): JSX.Element[] {

        return this.state.decorators.map((decorator: DecoratorResponse) =>
            (<tr key={decorator.name}>
                <td>{decorator.name}</td>
                <td>{decorator.description}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/decorator/e/' + decorator.name)}
                    size={SIZE.RELATIVE}>
                    Edit
                </NeonButton></td>
            </tr>),
        );
    }
}
