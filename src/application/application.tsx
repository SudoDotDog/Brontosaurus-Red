/**
 * @author WMXPY
 * @namespace Application
 * @description Application
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

export class ApplicationBase extends React.Component<ConnectedProps, ApplicationState> {

    public readonly state: ApplicationState = {

        applications: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public constructor(props: ConnectedProps) {

        super(props);
        this._searchApplication = this._searchApplication.bind(this);
    }

    public render() {

        return (<div>
            <SearchNew
                label="Application"
                onSearch={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchApplication)}
                onNew={() => this.props.history.push('/admin/application/create')}
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
                        this.props.language.get(PROFILE.ACTION),
                    ]}
                    style={{ marginTop: '1rem' }}>
                    {this._renderApplication()}
                </NeonTable>}

            <PageSelector
                total={this.state.pages}
                selected={this.state.page}
                onClick={(page: number) => this.setState({ page }, this._searchApplication)}
            />
        </div>);
    }

    private _renderApplication(): JSX.Element[] {

        return this.state.applications.map((application: ApplicationResponse) => {

            const greenAccess: string = this.props.language.get(
                Boolean(application.greenAccess) ? PROFILE.YES : PROFILE.NO,
            );

            const portalAccess: string = this.props.language.get(
                Boolean(application.portalAccess) ? PROFILE.YES : PROFILE.NO,
            );

            return (<tr key={application.key}>
                <td>
                    <ClickableSpan
                        to={'/admin/application/e/' + encodeURIComponent(application.key)}
                    >
                        {application.name}
                    </ClickableSpan>
                </td>
                <td>{application.key}</td>
                <td>{application.expire}</td>
                <td>{greenAccess}</td>
                <td>{portalAccess}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/admin/application/more/' + encodeURIComponent(application.key))}
                    size={SIZE.RELATIVE}>
                    {this.props.language.get(PROFILE.MORE)}
                </NeonButton></td>
            </tr>);
        });
    }

    private async _searchApplication() {

        const response: FetchApplicationResponse = await fetchApplication(
            this.state.keyword,
            this.state.page,
        );
        this.setState({
            applications: response.applications,
            pages: response.pages,
        });
    }
}

export const Application: React.ComponentType<{}> = connector.connect(ApplicationBase);
