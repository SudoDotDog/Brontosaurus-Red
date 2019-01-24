/**
 * @author WMXPY
 * @namespace User
 * @description User
 */

import { NeonButton } from "@sudoo/neon/button";
import { NeonInput } from "@sudoo/neon/input";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as __User from "../../style/route/user.scss";

type UserRouteProp = {
} & RouteComponentProps;


export class UserRoute extends React.Component<UserRouteProp> {

    public render() {

        return (
            <div className={__User.searchBar}>
                <NeonInput style={{ flex: 1 }} label="Search" />
                <NeonButton style={{ flex: 1, height: '100%' }}>
                    New
                </NeonButton>
            </div>
        );
    }
}
