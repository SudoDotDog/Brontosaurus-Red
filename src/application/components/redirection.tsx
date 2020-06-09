/**
 * @author WMXPY
 * @namespace Application_Components
 * @description Redirection
 */

import { produce } from "@sudoo/immutable";
import { NeonCoin } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonInput } from "@sudoo/neon/input";
import * as React from "react";
import * as RedirectionStyle from "../../../style/application/components/redirection.scss";
import { ApplicationRedirection } from "../../common/declare";

type ApplicationRedirectionProp = {

    readonly redirections: ApplicationRedirection[];
    readonly onChange: (newRedirections: ApplicationRedirection[]) => void;
};

type ApplicationRedirectionStates = {

    readonly testValue: string;
};

export class ApplicationRedirectionEditor extends React.Component<ApplicationRedirectionProp, ApplicationRedirectionStates> {

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
                                name: 'NewRedirection',
                                regexp: '^https://example.com/.+$',
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
                label="Test Redirect"
                value={this.state.testValue}
                onChange={(newValue: string) => this.setState({
                    testValue: newValue,
                })}
            />
            <div className={RedirectionStyle.testBox}>
                {this._getTestResult()}
            </div>
        </div>);
    }

    private _renderRedirect(redirection: ApplicationRedirection, index: number) {

        return (<div key={`${redirection.name}+${index}`}>
            <div className={RedirectionStyle.nameContainer}>
                <NeonInput
                    className={RedirectionStyle.nameInput}
                    label="Name"
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
                className={RedirectionStyle.regexpInput}
                label="Regexp"
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

        for (const redirect of this.props.redirections) {
            const regexp: RegExp = new RegExp(redirect.regexp);
            if (regexp.test(this.state.testValue)) {
                return `Succeed by "${redirect.name}"`;
            }
        }
        return `Failed`;
    }
}
