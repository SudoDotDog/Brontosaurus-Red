/**
 * @author WMXPY
 * @namespace Organization
 * @description Sub Register
 */

import { DEFAULT_BRONTOSAURUS_NAMESPACE } from "@brontosaurus/definition";
import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { registerInfo } from "../account/repository/register-infos";
import { GoBack } from "../components/go-back";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { TitleManager } from "../util/title";
import { registerSubOrganization } from "./repository/register";

type OrganizationSubRegisterStates = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly infos: Array<{
        readonly name: string;
        readonly type: string;
    }>;
    readonly tags: string[];
    readonly selected: string[];
    readonly current: Record<string, any>;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type OrganizationSubRegisterProps = RouteComponentProps & ConnectedStates;

export class OrganizationSubRegisterBase extends React.Component<OrganizationSubRegisterProps, OrganizationSubRegisterStates> {

    public readonly state: OrganizationSubRegisterStates = {

        loading: false,
        cover: undefined,
        current: {
            namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT,
        },
        tags: [],
        selected: [],
        infos: [],
    };

    public async componentDidMount() {

        const organizationName: string = this._getOrganizationName();
        TitleManager.setNestedPage(PROFILE.ORGANIZATION, PROFILE.REGISTER, organizationName);

        const infos: Array<{
            name: string;
            type: string;
        }> = await registerInfo();

        this.setState({
            infos: infos.map((info) => ({
                name: info.name,
                type: info.type,
            })),
        });
    }

    public componentWillUnmount(): void {

        TitleManager.restore();
    }

    public render() {

        return (<React.Fragment>
            <GoBack />
            <NeonIndicator
                loading={this.state.loading}
                covering={Boolean(this.state.cover)}
                cover={this._renderSticker()}
            >
                <NamedTitle about={this.props.language.get(
                    PROFILE.REGISTER_ACCOUNT_FOR_INSTANCE,
                    this.props.language.get(PROFILE.ORGANIZATION),
                )}>
                    {this._getOrganizationName()}
                </NamedTitle>
                <NeonSmartForm
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                />
                <NeonButton
                    onClick={() => this._submit(this.state.current)}
                    width={WIDTH.FULL}
                    size={SIZE.MEDIUM}
                    margin={MARGIN.SMALL}
                >
                    {this.props.language.get(PROFILE.SUBMIT)}
                </NeonButton>
            </NeonIndicator>
        </React.Fragment>);
    }

    private _getForm(): Record<string, INPUT_TYPE | FromElement> {

        return {
            username: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.USERNAME),
            },
            namespace: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.NAMESPACE),
            },
            displayName: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.DISPLAY_NAME),
            },
            email: {
                type: INPUT_TYPE.EMAIL,
                display: this.props.language.get(PROFILE.EMAIL),
            },
            phone: {
                type: INPUT_TYPE.NUMBER,
                display: this.props.language.get(PROFILE.PHONE),
            },
            ...this.state.infos.reduce((previous: Record<string, INPUT_TYPE>, current: {
                name: string;
                type: string;
            }) => {

                return {
                    ...previous,
                    [current.name]: INPUT_TYPE.TEXT,
                };
            }, {}),
        };
    }

    private async _submit(response: Record<string, any>) {

        if (!response.username) {
            alert('username required');
            return;
        }

        if (!response.namespace) {
            alert('namespace required');
            return;
        }

        this.setState({
            loading: true,
        });

        const parsed: Record<string, string> = this.state.infos.reduce((previous: Record<string, string>, current: {
            name: string;
            type: string;
        }) => {

            return {
                ...previous,
                [current.name]: response[current.name] || '',
            };
        }, {} as Record<string, string>);

        try {
            const tempPassword: string = await registerSubOrganization(
                this._getOrganizationName(),
                response.username || '',
                response.namespace,
                response.displayName,
                response.email,
                response.phone,
                parsed,
            );

            this.setState({
                cover: createSucceedCover(
                    this.props.language,
                    tempPassword,
                    () => this.props.history.goBack(),
                ),
            });

            window.alert(`${response.username}'s temp new password is ${tempPassword}`);
        } catch (err) {

            this.setState({
                cover: createFailedCover(
                    this.props.language,
                    err.message,
                    () => this.setState({ cover: undefined }),
                ),
            });
        }

        this.setState({
            loading: false,
        });
    }

    private _renderSticker() {

        if (!this.state.cover) {
            return null;
        }
        return <NeonSticker {...this.state.cover} />;
    }

    private _getOrganizationName(): string {

        const params: any = this.props.match.params;
        return decodeURIComponent(params.organization);
    }
}

export const OrganizationSubRegister: React.ComponentType = connector.connect(OrganizationSubRegisterBase);
