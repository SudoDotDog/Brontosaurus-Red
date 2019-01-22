/**
 * @author WMXPY
 * @namespace User
 * @description User
 */

import { NeonButton } from "@sudoo/neon/button";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

type UserProp = {
} & RouteComponentProps;


export class User extends React.Component<UserProp> {

    public render() {

        return (
            <NeonButton>
                Create User
            </NeonButton>
        );
    }
}
