/**
 * @author WMXPY
 * @namespace Account
 * @description Assign
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE } from "@sudoo/neon/declare";
import { NeonSticker } from "@sudoo/neon/flag";
import { NeonApplicable } from "@sudoo/neon/input";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonTable } from "@sudoo/neon/table";
import { NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { PageSelector } from "../components/page-selector";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { fetchOrganization, FetchOrganizationResponse, OrganizationResponse } from "../organization/repository/organization-fetch";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { buildAdminAccountEdit, buildAdminOrganizationEdit } from "../util/path";
import { setOrganizationRepository } from "./repository/set-organization";

export type AccountOrganizationAssignStates = {

    readonly loading: boolean;
    readonly cover: any;

    readonly organizations: OrganizationResponse[];
    readonly keyword: string;
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

type AccountOrganizationAssignProps = RouteComponentProps & ConnectedStates;

export class AccountOrganizationAssignBase extends React.Component<AccountOrganizationAssignProps, AccountOrganizationAssignStates> {

    public readonly state: AccountOrganizationAssignStates = {

        loading: false,
        cover: undefined,

        organizations: [],
        keyword: '',
        pages: 0,
        page: 0,
    };

    public componentDidMount() {

        this._searchOrganization();
    }

    public render() {

        return (
            <NeonIndicator
                loading={this.state.loading}
                covering={Boolean(this.state.cover)}
                cover={this._renderSticker()}
            >
                <GoBack />
                <NeonTitle margin={MARGIN.SMALL}>
                    {this.props.language.get(
                        PROFILE.SET_INSTANCE_ORGANIZATION,
                        this._getUsername(),
                    )}
                </NeonTitle>

                <NeonApplicable
                    size={SIZE.MEDIUM}
                    label={this.props.language.get(PROFILE.SEARCH_TARGET_ORGANIZATION)}
                    apply={this.props.language.get(PROFILE.APPLY)}
                    onApply={(keyword: string) => this.setState({ keyword, page: 0 }, () => {
                        this._searchOrganization();
                    })}
                />

                {this.state.organizations.length === 0
                    ? void 0
                    : <NeonTable
                        headers={[
                            this.props.language.get(PROFILE.NAME),
                            this.props.language.get(PROFILE.OWNER),
                            this.props.language.get(PROFILE.ACTION),
                        ]}
                        style={{ marginTop: '1rem' }}>
                        {this._renderOrganizations()}
                    </NeonTable>}

                <PageSelector
                    total={this.state.pages}
                    selected={this.state.page}
                    onClick={(page: number) => this.setState({ page }, () => {
                        this._searchOrganization();
                    })}
                />
            </NeonIndicator>
        );
    }

    private _renderSticker() {

        if (!this.state.cover) {
            return null;
        }
        return <NeonSticker {...this.state.cover} />;
    }

    private _renderOrganizations(): JSX.Element[] {

        return this.state.organizations.map((organization: OrganizationResponse) =>
            (<tr key={organization.name}>
                <td>
                    <ClickableSpan
                        to={buildAdminOrganizationEdit(organization.name)}
                        red={!organization.active}
                    >
                        {organization.name}
                    </ClickableSpan>
                </td>
                <td>
                    <ClickableSpan
                        to={buildAdminAccountEdit(organization.owner, organization.ownerNamespace)}
                        red={!organization.ownerActive}
                    >
                        {organization.owner}
                    </ClickableSpan>
                </td>
                <td><NeonButton
                    onClick={() => this._assign(organization.name)}
                    size={SIZE.RELATIVE}>
                    {this.props.language.get(PROFILE.ASSIGN_TO)}
                </NeonButton></td>
            </tr>),
        );
    }

    private async _assign(organization: string) {

        const username: string = this._getUsername();
        const namespace: string = this._getNamespace();
        const validation: boolean = window.confirm(`Assign "${username}" to "${organization}"?`);

        this.setState({
            loading: true,
            cover: undefined,
        });

        if (validation) {
            try {
                const response = await setOrganizationRepository(username, namespace, organization);

                this.setState({
                    cover: createSucceedCover(
                        this.props.language,
                        response.account + ' > ' + response.organization,
                        () => this.props.history.push(buildAdminAccountEdit(username, namespace)),
                    ),
                });
            } catch (err) {
                this.setState({
                    cover: createFailedCover(
                        this.props.language,
                        err.message,
                        () => this.setState({ cover: undefined }),
                    ),
                });
            } finally {

                this.setState({
                    loading: false,
                });
            }
        }
    }

    private async _searchOrganization() {

        const response: FetchOrganizationResponse = await fetchOrganization(
            this.state.keyword,
            this.state.page,
        );
        this.setState({
            organizations: response.organizations,
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

export const AccountOrganizationAssign: React.ComponentType = connector.connect(AccountOrganizationAssignBase);
