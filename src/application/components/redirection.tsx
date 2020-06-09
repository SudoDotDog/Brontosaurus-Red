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
};

export class ApplicationRedirectionEditor extends React.Component<ApplicationRedirectionProp, ApplicationRedirectionStates> {

    public readonly state: ApplicationRedirectionStates = {
    };

    public render() {

        return (
            <div>
                {this.props.redirections.map((each: ApplicationRedirection, index: number) => {
                    return this._renderRedirect(each, index);
                })}
                <NeonCoin
                    size={SIZE.NORMAL}
                    onClick={() => {
                        this.props.onChange([
                            ...this.props.redirections,
                            {
                                name: '',
                                regexp: '^https://example.com/.+$',
                            },
                        ]);
                    }}
                >+</NeonCoin>
            </div>
        );
    }

    private _renderRedirect(redirection: ApplicationRedirection, index: number) {

        return (<div key={index}>
            <div className={RedirectionStyle.nameContainer}>
                <NeonInput
                    style={{ flex: 1 }}
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
                label="Name"
                value={redirection.name}
            />
        </div>);
    }
}
