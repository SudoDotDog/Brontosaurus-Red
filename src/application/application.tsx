/**
 * @author WMXPY
 * @namespace Application
 * @description Application
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonTable } from "@sudoo/neon/table";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ClickableSpan } from "../components/clickable-span";
import { PageSelector } from "../components/page-selector";
import { SearchNew } from "../components/search-new";
import { ApplicationResponse, fetchApplication, FetchApplicationResponse } from "./repository/application-fetch";

export type ApplicationProp = {
} & RouteComponentProps;

export type ApplicationState = {

    readonly applications: ApplicationResponse[];
    readonly keyword: string;
    readonly pages: number;
    readonly page: number;
};

export class Application extends React.Component<ApplicationProp, ApplicationState> {

    public readonly state: ApplicationState = {

        applications: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public constructor(props: ApplicationProp) {

        super(props);
        this._searchApplication = this._searchApplication.bind(this);
    }

    public render() {

        return (
            <div>

                <SearchNew
                    label="Application"
                    onSearch={(keyword: string) => this.setState({ keyword, page: 0 }, this._searchApplication)}
                    onNew={() => this.props.history.push('/admin/application/create')}
                />

                {this.state.applications.length === 0
                    ? void 0
                    : <NeonTable
                        headers={['Name', 'Key', 'Expire', 'Action']}
                        style={{ marginTop: '1rem' }}>
                        {this._renderApplication()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, this._searchApplication)}
                />
            </div>

        );
    }

    private _renderApplication(): JSX.Element[] {

        return this.state.applications.map((application: ApplicationResponse) =>
            (<tr key={application.key}>
                <td>
                    <ClickableSpan
                        to={'/admin/application/e/' + encodeURIComponent(application.key)}
                    >
                        {application.name}
                    </ClickableSpan>
                </td>
                <td>{application.key}</td>
                <td>{application.expire}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/admin/application/e/' + encodeURIComponent(application.key))}
                    size={SIZE.RELATIVE}>
                    Edit
                </NeonButton></td>
            </tr>),
        );
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
