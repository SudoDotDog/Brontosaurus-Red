/**
 * @author WMXPY
 * @namespace Application
 * @description Edit
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { NeonPair } from "@sudoo/neon/input";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as ApplicationEditStyle from "../../style/application/edit.scss";
import { AllGroupsResponse, fetchAllGroups } from "../common/repository/all-group";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { SingleApplicationFetchResponse, singleFetchApplicationRepository } from "./repository/single-fetch";
import { updateApplicationRepository } from "./repository/update";

type ApplicationEditProp = {
} & RouteComponentProps;

type ApplicationEditState = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly application: SingleApplicationFetchResponse | null;
    readonly groups: string[];
};

export class ApplicationEdit extends React.Component<ApplicationEditProp, ApplicationEditState> {

    public state: ApplicationEditState = {

        loading: false,
        cover: undefined,
        application: null,
        groups: [],
    };

    public constructor(props: ApplicationEditProp) {

        super(props);

        this._submit = this._submit.bind(this);
    }

    public async componentDidMount() {

        const response: SingleApplicationFetchResponse = await singleFetchApplicationRepository(this._getApplicationKey());
        const groups: AllGroupsResponse[] = await fetchAllGroups();

        this.setState({
            application: response,
            groups: groups.map((group) => group.name),
        });
    }

    public render() {

        return (
            <div>
                <GoBack
                    right="More"
                    onClickRight={() => this.props.history.push('/admin/application/more/' + encodeURIComponent(this._getApplicationName()))}
                />
                {this._renderEditableInfos()}
            </div>
        );
    }

    private _renderEditableInfos() {

        if (!this.state.application) {
            return null;
        }

        return (
            <NeonThemeProvider value={{
                margin: MARGIN.SMALL,
            }} >
                <NeonIndicator
                    loading={this.state.loading}
                    covering={Boolean(this.state.cover)}
                    cover={this._renderSticker()}
                >
                    <NamedTitle about="Editing Application">
                        {this.state.application.key}
                    </NamedTitle>
                    <NeonPair
                        label="Key"
                        value={this.state.application.key}
                    />
                    <NeonPair
                        label="Avatar"
                        editable
                        value={this.state.application.avatar || ''}
                        onChange={(value: string) => this._updateApplication('avatar', value)}
                    />
                    <NeonPair
                        label="Name"
                        editable
                        value={this.state.application.name}
                        onChange={(value: string) => this._updateApplication('name', value)}
                    />
                    <NeonPair
                        label="Expire"
                        editable
                        value={this.state.application.expire.toString()}
                        onChange={(value: string) => this._updateApplication('expire', Number(value))}
                    />
                    <NeonPair
                        label="Green"
                        value={this.state.application.green.toString()}
                    />
                    <NeonPair
                        label="Green Access"
                        value={this.state.application.greenAccess ? 'Yes' : 'No'}
                    />
                    <NeonPair
                        label="Portal Access"
                        value={this.state.application.portalAccess ? 'Yes' : 'No'}
                    />
                    <div className={ApplicationEditStyle.container}>
                        <div className={ApplicationEditStyle.label}>
                            Public Key
                        </div>
                        <div className={ApplicationEditStyle.display}>
                            {this.state.application.publicKey.split('\n').map((part: string, index: number) => {
                                return (<div key={index}>
                                    {part}
                                </div>);
                            })}
                        </div>
                    </div>
                    <NeonTitle size={SIZE.MEDIUM}>User Group</NeonTitle>
                    <NeonPillGroup
                        style={{ flexWrap: 'wrap' }}
                        selected={this.state.application.groups}
                        onChange={(next: string[]) => this._updateApplication('groups', next)}
                        addable
                        removable
                        options={this.state.groups}
                    />
                    <NeonTitle size={SIZE.MEDIUM}>Requires</NeonTitle>
                    <NeonPillGroup
                        style={{ flexWrap: 'wrap' }}
                        selected={this.state.application.requires}
                        onChange={(next: string[]) => this._updateApplication('requires', next)}
                        addable
                        removable
                        options={this.state.groups}
                    />
                    <NeonButton
                        size={SIZE.MEDIUM}
                        width={WIDTH.FULL}
                        onClick={this._submit}
                    >
                        Save Change
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

            const name: string = await updateApplicationRepository(this.state.application);

            this.setState({
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",
                    info: name,

                    peek: {
                        children: "<-",
                        expend: "Complete",
                        onClick: this.props.history.goBack,
                    },
                },
            });
        } catch (err) {

            this.setState({
                cover: {
                    type: SIGNAL.ERROR,
                    title: "Failed",
                    info: err.message,

                    peek: {
                        children: "<-",
                        expend: "Retry",
                        onClick: () => this.setState({ cover: undefined }),
                    },
                },
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
