/**
 * @author WMXPY
 * @namespace Me
 * @description Me
 */

import { NeonButton } from "@sudoo/neon/button";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

type MeProp = {
} & RouteComponentProps;

type MeState = {

    info: {};
};

export class Me extends React.Component<MeProp, MeState> {

    public state: MeState = {
        info: {},
    };

    public render() {

        return (
            <div>

                <NeonButton>Change Password</NeonButton>
            </div>

        );
    }
}
