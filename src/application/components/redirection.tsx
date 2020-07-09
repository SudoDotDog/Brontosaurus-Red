/**
 * @author WMXPY
 * @namespace Application_Components
 * @description Redirection
 */

import { produce } from "@sudoo/immutable";
import { SudooFormat } from "@sudoo/internationalization";
import { NeonCoin } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonInput } from "@sudoo/neon/input";
import { randomUnique } from "@sudoo/random";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import * as RedirectionStyle from "../../../style/application/components/redirection.scss";
import { ApplicationRedirection } from "../../common/declare";
import { intl } from "../../i18n/intl";
import { PROFILE } from "../../i18n/profile";
import { IStore } from "../../state/declare";

type ApplicationRedirectionBaseProp = {

    readonly redirections: ApplicationRedirection[];
    readonly onChange: (newRedirections: ApplicationRedirection[]) => void;
};

type ApplicationRedirectionStates = {

    readonly testValue: string;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type ApplicationRedirectionProp = ApplicationRedirectionBaseProp & ConnectedStates;

export class ApplicationRedirectionEditorBase extends React.Component<ApplicationRedirectionProp, ApplicationRedirectionStates> {

    public readonly state: ApplicationRedirectionStates = {

        testValue: '',
    };

    public render() {

        return (
            <div>
                {this._renderTestRedirect()}
                {this.props.redirections.map((each: ApplicationRedirection, index: number) => {
                    return this._renderRedirect(each, index);
                })}
                <NeonCoin
                    size={SIZE.NORMAL}
                    onClick={() => {
                        this.props.onChange([
                            ...this.props.redirections,
                            {
                                identifier: randomUnique(),
                                name: 'New-Redirection',
                                regexp: '^https://example\\.sudo\\.dog/.*$',
                            },
                        ]);
                    }}
                >+</NeonCoin>
            </div>
        );
    }

    private _renderTestRedirect() {

        return (<div>
            <NeonInput
                label={this.props.language.get(PROFILE.TEST_REDIRECTION)}
                value={this.state.testValue}
                onChange={(newValue: string) => this.setState({
                    testValue: newValue,
                })}
            />
            <div className={RedirectionStyle["test-box"]}>
                {this._getTestResult()}
            </div>
        </div>);
    }

    private _renderRedirect(redirection: ApplicationRedirection, index: number) {

        return (<div key={redirection.identifier}>
            <div className={RedirectionStyle["name-container"]}>
                <NeonInput
                    className={RedirectionStyle["name-input"]}
                    label={this.props.language.get(PROFILE.NICKNAME)}
                    value={redirection.name}
                    onChange={(newName: string) => {
                        this.props.onChange(produce(this.props.redirections, (draft: ApplicationRedirection[]) => {
                            draft[index].name = newName;
                        }));
                    }}
                />
                <NeonCoin
                    size={SIZE.NORMAL}
                    onClick={() => {
                        this.props.onChange(this.props.redirections.filter(
                            (_: ApplicationRedirection, currentIndex: number) => {
                                return currentIndex !== index;
                            }),
                        );
                    }}
                >X</NeonCoin>
            </div>
            <NeonInput
                className={RedirectionStyle["regexp-input"]}
                label={this.props.language.get(PROFILE.REGEXP)}
                value={redirection.regexp}
                onChange={(newRegexp: string) => {
                    this.props.onChange(produce(this.props.redirections, (draft: ApplicationRedirection[]) => {
                        draft[index].regexp = newRegexp;
                    }));
                }}
            />
        </div>);
    }

    private _getTestResult(): string {

        try {
            for (const redirect of this.props.redirections) {
                const regexp: RegExp = new RegExp(redirect.regexp);
                if (regexp.test(this.state.testValue)) {
                    return this.props.language.get(
                        PROFILE.REDIRECTION_MATCHED_WITH,
                        redirect.name,
                    );
                }
            }
            return this.props.language.get(PROFILE.NO_MATCHED_REDIRECTION);
        } catch (err) {

            return this.props.language.get(PROFILE.INVALID_REGULAR_EXPRESSION);
        }
    }
}

export const ApplicationRedirectionEditor: React.ComponentType<ApplicationRedirectionBaseProp> = connector.connect(ApplicationRedirectionEditorBase);
