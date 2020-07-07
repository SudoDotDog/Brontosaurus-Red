/**
 * @author WMXPY
 * @namespace Namespace
 * @description Edit
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIGNAL, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker } from "@sudoo/neon/flag";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSmartList } from "@sudoo/neon/table";
import { NeonThemeProvider } from "@sudoo/neon/theme";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { singleNamespace, SingleNamespaceResponse } from "./repository/single";
import { updateNamespaceRepository } from "./repository/update";

type NamespaceEditProp = {
} & RouteComponentProps;

type NamespaceEditState = {

    readonly loading: boolean;
    readonly cover: any;
    readonly namespace: SingleNamespaceResponse | null;
};

export class NamespaceEdit extends React.Component<NamespaceEditProp, NamespaceEditState> {

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

        return (
            <div>
                <GoBack
                    right="More"
                    onClickRight={() => this.props.history.push('/admin/namespace/more/' + encodeURIComponent(this._getNamespaceNamespace()))}
                />
                {this._renderEditableInfos()}
            </div>
        );
    }

    private _renderEditableInfos() {

        if (!this.state.namespace) {
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
                    <NamedTitle about="Editing Namespace">
                        {this.state.namespace.name}
                    </NamedTitle>
                    <NeonSub>Namespace {this.state.namespace.active ? "Active" : "Deactivated"}</NeonSub>
                    {this._renderDescription()}
                    <NeonButton
                        size={SIZE.MEDIUM}
                        width={WIDTH.FULL}
                        onClick={this._submit.bind(this)}>
                        Save Change
                    </NeonButton>
                </NeonIndicator>
            </NeonThemeProvider>
        );
    }

    private _renderDescription() {

        const namespace = this.state.namespace as SingleNamespaceResponse;
        return (<React.Fragment>
            <NeonTitle size={SIZE.MEDIUM}>Name</NeonTitle>
            <NeonSmartList
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
            <NeonTitle size={SIZE.MEDIUM}>Information</NeonTitle>
            <NeonSmartList
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
