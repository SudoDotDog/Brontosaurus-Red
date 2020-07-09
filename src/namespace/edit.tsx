/**
 * @author WMXPY
 * @namespace Namespace
 * @description Edit
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker } from "@sudoo/neon/flag";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSmartList } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ActiveStatus } from "../components/active-status";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { buildAdminNamespaceMore } from "../util/path";
import { singleNamespace, SingleNamespaceResponse } from "./repository/single";
import { updateNamespaceRepository } from "./repository/update";

type NamespaceEditState = {

    readonly loading: boolean;
    readonly cover: any;
    readonly namespace: SingleNamespaceResponse | null;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type NamespaceEditProp = RouteComponentProps & ConnectedStates;

export class NamespaceEditBase extends React.Component<NamespaceEditProp, NamespaceEditState> {

    public readonly state: NamespaceEditState = {

        loading: false,
        cover: undefined,
        namespace: null,
    };

    public async componentDidMount() {

        const response: SingleNamespaceResponse = await singleNamespace(this._getNamespaceNamespace());

        this.setState({
            namespace: response,
        });
    }

    public render() {

        return (<div>
            <GoBack
                right={this.props.language.get(PROFILE.MORE)}
                onClickRight={() => buildAdminNamespaceMore(this._getNamespaceNamespace())}
            />
            {this._renderEditableInfos()}
        </div>);
    }

    private _renderEditableInfos() {

        if (!this.state.namespace) {
            return null;
        }

        return (<NeonThemeProvider value={{
            margin: MARGIN.SMALL,
        }} >
            <NeonIndicator
                loading={this.state.loading}
                covering={Boolean(this.state.cover)}
                cover={this._renderSticker()}
            >
                <NamedTitle about={this.props.language.get(
                    PROFILE.EDITING,
                    this.props.language.get(PROFILE.NAMESPACE),
                )}>
                    {this._renderName()}
                </NamedTitle>
                <ActiveStatus
                    active={this.state.namespace.active}
                />
                {this._renderDescription()}
                <NeonButton
                    size={SIZE.MEDIUM}
                    width={WIDTH.FULL}
                    onClick={this._submit.bind(this)}
                >
                    {this.props.language.get(PROFILE.SAVE_CHANGE)}
                </NeonButton>
            </NeonIndicator>
        </NeonThemeProvider>);
    }

    private _renderName() {

        if (!this.state.namespace) {
            return null;
        }

        if (typeof this.state.namespace.name === 'string'
            && this.state.namespace.name.length > 0) {
            return this.state.namespace.name;
        }

        return this.state.namespace.namespace;
    }

    private _renderDescription() {

        const namespace = this.state.namespace as SingleNamespaceResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.NICKNAME)}
            </NeonTitle>
            <NeonSmartList
                name={this.props.language.get(PROFILE.KEY)}
                value={this.props.language.get(PROFILE.VALUE)}
                list={{
                    Name: namespace.name || '',
                }}
                editableValue
                onChange={(newInfo: Record<string, string>) => this.setState({
                    namespace: {
                        ...namespace,
                        name: newInfo.Name,
                    },
                })}
            />
            <NeonTitle size={SIZE.MEDIUM}>
                {this.props.language.get(PROFILE.INFORMATION)}
            </NeonTitle>
            <NeonSmartList
                name={this.props.language.get(PROFILE.KEY)}
                value={this.props.language.get(PROFILE.VALUE)}
                list={{
                    Domain: namespace.domain,
                    Namespace: namespace.namespace,
                }}
            />
        </React.Fragment>);
    }

    private _renderSticker() {

        if (!this.state.cover) {
            return null;
        }
        return <NeonSticker {...this.state.cover} />;
    }

    private async _submit() {

        if (!this.state.namespace) {
            return;
        }

        this.setState({
            loading: true,
            cover: undefined,
        });

        try {

            const name: string = await updateNamespaceRepository({
                name: this.state.namespace.name,
                namespace: this.state.namespace.namespace,
            });

            this.setState({
                cover: {
                    type: SIGNAL.SUCCEED,
                    title: "Succeed",
                    info: name,

                    peek: {
                        children: "<-",
                        expend: "Complete",
                        onClick: () => {
                            this.props.history.goBack();
                        },
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

    private _getNamespaceNamespace(): string {

        const params: any = this.props.match.params;
        return params.namespace;
    }
}

export const NamespaceEdit: React.ComponentType = connector.connect(NamespaceEditBase);
