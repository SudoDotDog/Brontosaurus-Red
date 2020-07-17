/**
 * @author WMXPY
 * @namespace Account
 * @description Resets
 */

import { MARGIN } from "@sudoo/neon/declare";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTable } from "@sudoo/neon/table";
import { NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { PageSelector } from "../components/page-selector";
import { AccountResetElement, AccountResetResponse, fetchAccountResets } from "./repository/resets";
import { TitleManager } from "../util/title";
import { PROFILE } from "../i18n/profile";

export type AccountResetsProps = {
} & RouteComponentProps;

export type AccountResetsStates = {

    readonly loading: boolean;

    readonly resets: AccountResetElement[];
    readonly pages: number;
    readonly page: number;
};

export class AccountResets extends React.Component<AccountResetsProps, AccountResetsStates> {

    public readonly state: AccountResetsStates = {

        loading: false,

        resets: [],
        pages: 0,
        page: 0,
    };

    public componentDidMount() {

        const username: string = this._getUsername();
        TitleManager.setNestedPage(PROFILE.ACCOUNT, PROFILE.RESET, username);
        this._fetchResets();
    }

    public componentWillUnmount(): void {

        TitleManager.restore();
    }

    public render() {

        return (
            <NeonIndicator
                loading={this.state.loading}
            >
                <GoBack />
                <NeonTitle margin={MARGIN.SMALL}>{this._getUsername()}&#39;s Resets</NeonTitle>

                {this.state.resets.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            'At',
                            'Application',
                            'Platform',
                            'User Agent',
                            'Succeed',
                            'Email Used',
                            'Email Expected',
                        ]}
                        style={{ marginTop: '1rem' }}>
                        {this._renderResets()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, () => {
                        this._fetchResets();
                    })}
                />
            </NeonIndicator>
        );
    }

    private _renderResets(): JSX.Element[] {

        return this.state.resets.map((reset: AccountResetElement) =>
            (<tr key={reset.identifier}>
                <td>{reset.at.toLocaleString()}</td>
                <td>{reset.application}</td>
                <td>{reset.platform}</td>
                <td>{reset.userAgent}</td>
                <td>{reset.succeed ? 'YES' : 'NO'}</td>
                <td>{reset.emailUsed}</td>
                <td>{reset.emailExpected}</td>
            </tr>),
        );
    }

    private async _fetchResets() {

        const username: string = this._getUsername();
        const namespace: string = this._getNamespace();

        const response: AccountResetResponse = await fetchAccountResets(
            username,
            namespace,
            this.state.page,
        );
        this.setState({
            resets: response.resets,
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
