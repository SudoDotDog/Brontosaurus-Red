/**
 * @author WMXPY
 * @namespace Account
 * @description Attempts
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTable } from "@sudoo/neon/table";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { PageSelector } from "../components/page-selector";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { AccountAttemptElement, AccountAttemptResponse, fetchAccountAttempts } from "./repository/attempts";
import { TitleManager } from "../util/title";

export type AccountAttemptsStates = {

    readonly loading: boolean;

    readonly attempts: AccountAttemptElement[];
    readonly pages: number;
    readonly page: number;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type AccountAttemptsProps = RouteComponentProps & ConnectedStates;

export class AccountAttemptsBase extends React.Component<AccountAttemptsProps, AccountAttemptsStates> {

    public readonly state: AccountAttemptsStates = {

        loading: false,

        attempts: [],
        pages: 0,
        page: 0,
    };

    public componentDidMount() {

        TitleManager.setNestedPage(PROFILE.ACCOUNT, PROFILE.ATTEMPTS);
        this._fetchAttempts();
    }

    public componentWillUnmount(): void {

        TitleManager.restore();
    }

    public render() {

        const language: SudooFormat = this.props.language;
        return (
            <NeonIndicator
                loading={this.state.loading}
            >
                <GoBack />
                <NamedTitle about={language.get(PROFILE.ATTEMPTS)}>
                    {this._getUsername()}
                </NamedTitle>
                {this.state.attempts.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            language.get(PROFILE.AT),
                            language.get(PROFILE.APPLICATION),
                            language.get(PROFILE.PLATFORM),
                            language.get(PROFILE.USER_AGENT),
                            language.get(PROFILE.SUCCEED),
                            language.get(PROFILE.SOURCE),
                            language.get(PROFILE.TARGET),
                        ]}
                        style={{ marginTop: '1rem' }}>
                        {this._renderAttempts()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, () => {
                        this._fetchAttempts();
                    })}
                />
            </NeonIndicator>
        );
    }

    private _renderAttempts(): JSX.Element[] {

        return this.state.attempts.map((attempt: AccountAttemptElement) =>
            (<tr key={attempt.identifier}>
                <td>{attempt.at.toLocaleString()}</td>
                <td>{attempt.application}</td>
                <td>{attempt.platform}</td>
                <td>{attempt.userAgent}</td>
                <td>
                    {attempt.succeed
                        ? this.props.language.get(PROFILE.YES)
                        : this.props.language.get(PROFILE.NO)
                    }
                </td>
                <td>{attempt.source} [{attempt.proxySources.join(', ')}]</td>
                <td>{attempt.target}</td>
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

export const AccountAttempts: React.ComponentType = connector.connect(AccountAttemptsBase);
