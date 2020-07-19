/**
 * @author WMXPY
 * @namespace Application
 * @description Application
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
import { formatYNBoolean } from "../util/language";
import { buildAdminApplicationEdit, buildAdminApplicationMore } from "../util/path";
import { TitleManager } from "../util/title";
import { ApplicationResponse, fetchApplication, FetchApplicationResponse } from "./repository/application-fetch";

export type ApplicationState = {

    readonly applications: ApplicationResponse[];
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

const searchKeywordCache: Dump<string> = Dump.create('application-search-keyword-cache', '');
const searchPageCache: Dump<number> = Dump.create('application-search-page-cache', 0);

export class ApplicationBase extends React.Component<ConnectedProps, ApplicationState> {

    public readonly state: ApplicationState = {

        applications: [],
        keyword: searchKeywordCache.value,
        pages: 0,
        page: searchPageCache.value,
    };

    private _mounted: boolean = false;
    private readonly _defaultValue: string = searchKeywordCache.value;

    public componentDidMount() {

        TitleManager.setSubPage(PROFILE.APPLICATION);

        this._mounted = true;
        this._searchApplication();
    }

    public componentWillUnmount() {

        this._mounted = false;
        TitleManager.restore();
    }

    public render() {

        return (<div>
            <SearchNew
                defaultValue={this._defaultValue}
                label={this.props.language.get(PROFILE.APPLICATION)}
                onSearch={(keyword: string) => {

                    searchKeywordCache.replace(keyword);
                    searchPageCache.replace(0);

                    this.setState({
                        keyword,
                        page: 0,
                    }, () => {
                        this._searchApplication();
                    });
                }}
                onNew={() => {
                    this.props.history.push('/admin/application/create');
                }}
            />
            {this.state.applications.length === 0
                ? void 0
                : <NeonTable
                    headers={[
                        this.props.language.get(PROFILE.NAME),
                        this.props.language.get(PROFILE.KEY),
                        this.props.language.get(PROFILE.EXPIRE),
                        this.props.language.get(PROFILE.GREEN_ACCESS),
                        this.props.language.get(PROFILE.PORTAL_ACCESS),
                        this.props.language.get(PROFILE.REDIRECTIONS),
                        this.props.language.get(PROFILE.PROTOCOL),
                        this.props.language.get(PROFILE.ACTION),
                    ]}
                    style={{ marginTop: '1rem' }}>
                    {this._renderApplication()}
                </NeonTable>}
            <PageSelector
                total={this.state.pages}
                selected={this.state.page}
                onClick={(page: number) => {
                    searchPageCache.replace(page);
                    this.setState({ page }, () => {
                        this._searchApplication();
                    });
                }}
            />
        </div>);
    }

    private _renderApplication(): JSX.Element[] {

        return this.state.applications.map((application: ApplicationResponse) => {

            const greenAccess: string = formatYNBoolean(
                this.props.language,
                application.greenAccess,
            );
            const portalAccess: string = formatYNBoolean(
                this.props.language,
                application.portalAccess,
            );

            return (<tr key={application.key}>
                <td>
                    <ClickableSpan
                        to={buildAdminApplicationEdit(application.key)}
                        red={!application.active}
                    >
                        {application.name}
                    </ClickableSpan>
                </td>
                <td>{application.key}</td>
                <td>{application.expire}</td>
                <td>{greenAccess}</td>
                <td>{portalAccess}</td>
                <td>{application.redirections.length}</td>
                <td>{this._renderProtocol(application)}</td>
                <td>
                    <NeonButton
                        onClick={() => {
                            this.props.history.push(
                                buildAdminApplicationMore(application.key),
                            );
                        }}
                        size={SIZE.RELATIVE}
                    >
                        {this.props.language.get(PROFILE.MORE)}
                    </NeonButton>
                </td>
            </tr>);
        });
    }

    private _renderProtocol(application: ApplicationResponse): string {

        const buffer: string[] = [];

        if (application.iFrameProtocol) {
            buffer.push('I');
        }
        if (application.postProtocol) {
            buffer.push('P');
        }
        if (application.alertProtocol) {
            buffer.push('A');
        }
        if (application.noneProtocol) {
            buffer.push('N');
        }
        return buffer.join('');
    }

    private async _searchApplication() {

        const response: FetchApplicationResponse = await fetchApplication(
            this.state.keyword,
            this.state.page,
        );

        if (this._mounted) {
            this.setState({
                applications: response.applications,
                pages: response.pages,
            });
        }
    }
}

export const Application: React.ComponentType<unknown> = connector.connect(ApplicationBase);
