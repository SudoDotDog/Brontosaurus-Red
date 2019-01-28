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
import { SearchNew } from "../components/search-new";
import { ApplicationResponse, fetchApplication } from "./repository/application-fetch";

type ApplicationProp = {
} & RouteComponentProps;

type ApplicationState = {

    applications: ApplicationResponse[];
};

export class Application extends React.Component<ApplicationProp, ApplicationState> {

    public state: ApplicationState = {
        applications: [],
    };

    public render() {

        return (
            <div>

                <SearchNew
                    label="Application"
                    onSearch={async (keyword: string) => this.setState({ applications: await fetchApplication(keyword) })}
                    onNew={() => this.props.history.push('/group/new')}
                />

                {this.state.applications.length === 0
                    ? void 0
                    : <NeonTable style={{ marginTop: '1rem' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Key</th>
                                <th>Expire</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this._renderApplication()}
                        </tbody>
                    </NeonTable>}
            </div>

        );
    }

    private _renderApplication(): JSX.Element[] {

        return this.state.applications.map((application: ApplicationResponse) =>
            (<tr key={application.key}>
                <td>{application.name}</td>
                <td>{application.key}</td>
                <td>{application.expire}</td>
                <td><NeonButton
                    onClick={() => this.props.history.push('/application/e/' + application.key)}
                    size={SIZE.RELATIVE}>
                    Edit
                </NeonButton></td>
            </tr>),
        );
    }
}
