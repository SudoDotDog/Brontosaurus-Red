/**
 * @author WMXPY
 * @namespace Account
 * @description Attempts
 */

import { MARGIN } from "@sudoo/neon/declare";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTable } from "@sudoo/neon/table";
import { NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { PageSelector } from "../components/page-selector";
import { AccountAttemptElement, AccountAttemptResponse, fetchAccountAttempts } from "./repository/attempts";

export type AccountAttemptsProps = {
} & RouteComponentProps;

export type AccountAttemptsStates = {

    readonly loading: boolean;

    readonly attempts: AccountAttemptElement[];
    readonly pages: number;
    readonly page: number;
};

export class AccountAttempts extends React.Component<AccountAttemptsProps, AccountAttemptsStates> {

    public readonly state: AccountAttemptsStates = {

        loading: false,

        attempts: [],
        pages: 0,
        page: 0,
    };

    public constructor(props: AccountAttemptsProps) {

        super(props);
        this._fetchAttempts = this._fetchAttempts.bind(this);
    }

    public render() {

        return (
            <NeonIndicator
                loading={this.state.loading}
            >
                <GoBack />
                <NeonTitle margin={MARGIN.SMALL}>Set {this._getUsername()}'s Organization</NeonTitle>

                {this.state.attempts.length === 0
                    ? void 0
                    : <NeonTable
                        headers={['Name', 'Owner']}
                        style={{ marginTop: '1rem' }}>
                        {this._renderAttempts()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, this._fetchAttempts)}
                />
            </NeonIndicator>
        );
    }

    private _renderAttempts(): JSX.Element[] {

        return this.state.attempts.map((attempt: AccountAttemptElement) =>
            (<tr key={attempt.identifier}>
                <td>{attempt.account}</td>
                <td>{attempt.application}</td>
            </tr>),
        );
    }

    private async _fetchAttempts() {

        const username: string = this._getUsername();
        const namespace: string = this._getNamespace();

        const response: AccountAttemptResponse = await fetchAccountAttempts(
            username,
            namespace,
            this.state.page,
        );
        this.setState({
            attempts: response.attempts,
            pages: response.pages,
        });
    }

    private _getUsername(): string {

        const params: any = this.props.match.params;
        return params.username;
    }

    private _getNamespace(): string {

        const params: any = this.props.match.params;
        return params.namespace;
    }
}
