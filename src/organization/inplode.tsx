/**
 * @author WMXPY
 * @namespace Organization
 * @description Inplode
 */

import { DEFAULT_BRONTOSAURUS_NAMESPACE } from "@brontosaurus/definition";
import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSticker, NeonStickerCut } from "@sudoo/neon/flag";
import { FromElement, INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { NeonPillGroup } from "@sudoo/neon/pill";
import { NeonIndicator } from "@sudoo/neon/spinner";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { registerInfo } from "../account/repository/register-infos";
import { AllTagsResponse, fetchAllTags } from "../common/repository/all-tag";
import { ClickableSpan } from "../components/clickable-span";
import { GoBack } from "../components/go-back";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { buildAdminGroupEdit } from "../util/path";
import { inplodeOrganization } from "./repository/inplode";

type InplodeOrganizationStates = {

    readonly loading: boolean;
    readonly cover: NeonStickerCut | undefined;
    readonly infos: Array<{
        name: string;
        type: string;
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

type InplodeOrganizationProps = RouteComponentProps & ConnectedStates;

export class InplodeOrganizationBase extends React.Component<InplodeOrganizationProps, InplodeOrganizationStates> {

    public readonly state: InplodeOrganizationStates = {

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

        const infos: Array<{
            name: string;
            type: string;
        }> = await registerInfo();
        this._fetchTags();

        this.setState({
            infos: infos.map((info) => ({
                name: info.name,
                type: info.type,
            })),
        });
    }

    public render() {

        return (<React.Fragment>
            <GoBack />
            <NeonIndicator
                loading={this.state.loading}
                covering={Boolean(this.state.cover)}
                cover={this._renderSticker()}
            >
                <NeonTitle>
                    {this.props.language.get(
                        PROFILE.INPLODE_INSTANCE,
                        this.props.language.get(PROFILE.ORGANIZATION),
                    )}
                </NeonTitle>
                <NeonSub margin={MARGIN.SMALL}>
                    {this.props.language.get(PROFILE.ORGANIZATION_AND_USER)}
                </NeonSub>
                <NeonSmartForm
                    form={this._getForm()}
                    value={this.state.current}
                    onChange={(value: any) => this.setState({ current: value })}
                />
                <NeonSub margin={MARGIN.SMALL}>
                    {this.props.language.get(PROFILE.TAGS)}
                </NeonSub>
                <NeonPillGroup
                    addText={this.props.language.get(PROFILE.ADD_INDICATOR)}
                    margin={MARGIN.SMALL}
                    style={{ flexWrap: 'wrap' }}
                    selected={this.state.selected}
                    onChange={(next: string[]) => this.setState({ selected: next })}
                    render={(value: string) => {
                        return (<ClickableSpan
                            to={buildAdminGroupEdit(value)}
                        >
                            {value}
                        </ClickableSpan>);
                    }}
                    addable
                    removable
                    options={this.state.tags}
                />
                <NeonButton
                    onClick={() => this._submit(this.state.current)}
                    width={WIDTH.FULL}
                    size={SIZE.MEDIUM}
                    margin={MARGIN.SMALL}>
                    {this.props.language.get(PROFILE.SUBMIT)}
                </NeonButton>
            </NeonIndicator>
        </React.Fragment>);
    }

    private _getForm(): Record<string, INPUT_TYPE | FromElement> {

        return {
            name: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.ORGANIZATION_NAME),
            },
            username: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.OWNER_USERNAME),
            },
            namespace: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.OWNER_NAMESPACE),
            },
            displayName: {
                type: INPUT_TYPE.TEXT,
                display: this.props.language.get(PROFILE.OWNER_DISPLAY_NAME),
            },
            email: {
                type: INPUT_TYPE.EMAIL,
                display: this.props.language.get(PROFILE.OWNER_EMAIL),
            },
            phone: {
                type: INPUT_TYPE.NUMBER,
                display: this.props.language.get(PROFILE.OWNER_PHONE),
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

    private async _fetchTags() {

        const tags: AllTagsResponse[] = await fetchAllTags();
        this.setState({
            tags: tags.map((res: AllTagsResponse) => res.name),
        });
    }

    private async _submit(response: Record<string, any>) {

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

        if (!response.name) {
            alert('name required');
            return;
        }

        if (!response.username) {
            alert('username required');
            return;
        }

        if (!response.namespace) {
            alert('namespace required');
            return;
        }

        try {
            const tempPassword: string = await inplodeOrganization(
                response.name || '',
                response.username || '',
                response.namespace,
                response.displayName,
                response.email,
                response.phone,
                parsed,
                this.state.selected,
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
}

export const InplodeOrganization: React.ComponentType = connector.connect(InplodeOrganizationBase);
