/**
 * @author WMXPY
 * @namespace Application
 * @description Edit
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { NeonPair } from "@sudoo/neon/input";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonCheckbox } from "@sudoo/neon/radio";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as ApplicationEditStyle from "../../style/application/edit.scss";
import { ApplicationRedirection } from "../common/declare";
import { AllGroupsResponse, fetchAllGroups } from "../common/repository/all-group";
import { ActiveStatus } from "../components/active-status";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { buildAdminApplicationMore, buildAdminGroupEdit } from "../util/path";
import { ApplicationRedirectionEditor } from "./components/redirection";
import { SingleApplicationFetchResponse, singleFetchApplicationRepository } from "./repository/single-fetch";
import { updateApplicationRepository } from "./repository/update";

type ApplicationEditState = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly application: SingleApplicationFetchResponse | null;
    readonly groups: string[];
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type ApplicationEditProps = RouteComponentProps & ConnectedStates;

export class ApplicationEditBase extends React.Component<ApplicationEditProps, ApplicationEditState> {

    public state: ApplicationEditState = {

        loading: false,
        cover: undefined,
        application: null,
        groups: [],
    };

    public async componentDidMount() {

        const response: SingleApplicationFetchResponse = await singleFetchApplicationRepository(this._getApplicationKey());
        const groups: AllGroupsResponse[] = await fetchAllGroups();

        this.setState({
            application: response,
            groups: groups.map((group) => group.name),
        });
    }

    public render() {

        return (<div>
            <GoBack
                right={this.props.language.get(PROFILE.MORE)}
                onClickRight={() => this.props.history.push(buildAdminApplicationMore(this._getApplicationName()))}
            />
            {this._renderEditableInfos()}
        </div>);
    }

    private _renderEditableInfos() {

        if (!this.state.application) {
            return null;
        }

        const language: SudooFormat = this.props.language;
        return (
            <NeonThemeProvider value={{
                margin: MARGIN.SMALL,
            }} >
                <NeonIndicator
                    loading={this.state.loading}
                    covering={Boolean(this.state.cover)}
                    cover={this._renderSticker()}
                >
                    <NamedTitle about={language.get(
                        PROFILE.EDITING,
                        language.get(PROFILE.APPLICATION)
                    )}>
                        {this.state.application.key}
                    </NamedTitle>
                    <ActiveStatus
                        active={this.state.application.active}
                    />
                    <NeonPair
                        label={language.get(PROFILE.KEY)}
                        value={this.state.application.key}
                    />
                    <NeonPair
                        label={language.get(PROFILE.AVATAR)}
                        editable
                        value={this.state.application.avatar || ''}
                        onChange={(value: string) => this._updateApplication('avatar', value)}
                    />
                    <NeonPair
                        label={language.get(PROFILE.NICKNAME)}
                        editable
                        value={this.state.application.name}
                        onChange={(value: string) => this._updateApplication('name', value)}
                    />
                    <NeonPair
                        label={language.get(PROFILE.EXPIRE)}
                        editable
                        value={this.state.application.expire.toString()}
                        onChange={(value: string) => this._updateApplication('expire', Number(value))}
                    />
                    <NeonPair
                        label={language.get(PROFILE.GREEN_TOKEN)}
                        value={this.state.application.green.toString()}
                    />
                    <NeonPair
                        label={language.get(PROFILE.GREEN_ACCESS)}
                        value={this.state.application.greenAccess ? 'Yes' : 'No'}
                    />
                    <NeonPair
                        label={language.get(PROFILE.PORTAL_ACCESS)}
                        value={this.state.application.portalAccess ? 'Yes' : 'No'}
                    />
                    <div className={ApplicationEditStyle.container}>
                        <div className={ApplicationEditStyle.label}>
                            {language.get(PROFILE.PUBLIC_KEY)}
                        </div>
                        <div className={ApplicationEditStyle.display}>
                            {this.state.application.publicKey.split('\n').map((part: string, index: number) => {
                                return (<div key={index}>
                                    {part}
                                </div>);
                            })}
                        </div>
                    </div>
                    <NeonTitle size={SIZE.MEDIUM}>
                        {language.get(PROFILE.GROUPS)}
                    </NeonTitle>
                    <NeonPillGroup
                        addText={language.get(PROFILE.ADD_INDICATOR)}
                        style={{ flexWrap: 'wrap' }}
                        selected={this.state.application.groups}
                        onChange={(next: string[]) => this._updateApplication('groups', next)}
                        render={(value: string) => {
                            return (<ClickableSpan
                                to={buildAdminGroupEdit(value)}
                            >
                                {value}
                            </ClickableSpan>);
                        }}
                        addable
                        removable
                        options={this.state.groups}
                    />
                    <NeonTitle size={SIZE.MEDIUM}>
                        {language.get(PROFILE.REQUIRES)}
                    </NeonTitle>
                    <NeonPillGroup
                        addText={language.get(PROFILE.ADD_INDICATOR)}
                        style={{ flexWrap: 'wrap' }}
                        selected={this.state.application.requires}
                        onChange={(next: string[]) => this._updateApplication('requires', next)}
                        render={(value: string) => {
                            return (<ClickableSpan
                                to={buildAdminGroupEdit(value)}
                            >
                                {value}
                            </ClickableSpan>);
                        }}
                        addable
                        removable
                        options={this.state.groups}
                    />
                    <NeonTitle size={SIZE.MEDIUM}>
                        {language.get(PROFILE.REDIRECTIONS)}
                    </NeonTitle>
                    <div className={ApplicationEditStyle["protocol-grid"]}>
                        <NeonCheckbox
                            value={this.state.application.iFrameProtocol}
                            onChange={(newValue: boolean) => this._updateApplication('iFrameProtocol', newValue)}
                        >
                            {this.props.language.get(PROFILE.ALLOW_IFRAME)}
                        </NeonCheckbox>
                        <NeonCheckbox
                            value={this.state.application.postProtocol}
                            onChange={(newValue: boolean) => this._updateApplication('postProtocol', newValue)}
                        >
                            {this.props.language.get(PROFILE.ALLOW_POST)}
                        </NeonCheckbox>
                        <NeonCheckbox
                            value={this.state.application.alertProtocol}
                            onChange={(newValue: boolean) => this._updateApplication('alertProtocol', newValue)}
                        >
                            {this.props.language.get(PROFILE.ALLOW_ALERT)}
                        </NeonCheckbox>
                        <NeonCheckbox
                            value={this.state.application.noneProtocol}
                            onChange={(newValue: boolean) => this._updateApplication('noneProtocol', newValue)}
                        >
                            {this.props.language.get(PROFILE.ALLOW_NONE)}
                        </NeonCheckbox>
                    </div>
                    <ApplicationRedirectionEditor
                        redirections={this.state.application.redirections}
                        onChange={(newRedirections: ApplicationRedirection[]) => {
                            this._updateApplication('redirections', newRedirections);
                        }}
                    />
                    <NeonButton
                        size={SIZE.MEDIUM}
                        width={WIDTH.FULL}
                        onClick={this._submit.bind(this)}
                    >
                        {language.get(PROFILE.SAVE_CHANGE)}
                    </NeonButton>
                </NeonIndicator>
            </NeonThemeProvider>
        );
    }

    private _renderSticker() {

        if (!this.state.cover) {
            return null;
        }
        return <NeonSticker {...this.state.cover} />;
    }

    private _updateApplication<K extends keyof SingleApplicationFetchResponse>(key: K, value: SingleApplicationFetchResponse[K]): void {

        this.setState({
            application: {
                ...this.state.application as SingleApplicationFetchResponse,
                [key]: value,
            },
        });
    }

    private _getApplicationKey(): string {

        const params: any = this.props.match.params;
        return params.application;
    }

    private async _submit() {

        if (!this.state.application) {
            return;
        }

        this.setState({
            loading: true,
            cover: undefined,
        });

        try {

            const applicationName: string = await updateApplicationRepository(this.state.application);

            this.setState({
                cover: createSucceedCover(
                    this.props.language,
                    applicationName,
                    () => this.props.history.goBack(),
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

    private _getApplicationName(): string {

        const params: any = this.props.match.params;
        return params.application;
    }
}

export const ApplicationEdit: React.ComponentType = connector.connect(ApplicationEditBase);
