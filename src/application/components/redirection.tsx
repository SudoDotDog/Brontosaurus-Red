/**
 * @author WMXPY
 * @namespace Application_Components
 * @description Redirection
 */

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
                {this.props.redirections.map((each: ApplicationRedirection) => {
                    return this._renderRedirect(each);
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

    private _renderRedirect(redirection: ApplicationRedirection) {

        console.log(RedirectionStyle);

        return (<div>
            <NeonInput
                label="Name"
                value={redirection.name}
            />
            <NeonInput
                label="Name"
                value={redirection.name}
            />
        </div>);
    }
}
