/**
 * @author WMXPY
 * @namespace User
 * @description User
 */

import { NeonButton } from "@sudoo/neon/button";
import { SIZE } from "@sudoo/neon/declare";
import { NeonApplicable } from "@sudoo/neon/input";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as __User from "../../style/route/user.scss";

type UserRouteProp = {
} & RouteComponentProps;


export class UserRoute extends React.Component<UserRouteProp> {

    public render() {

        return (
            <div className={__User.searchBar}>
                <NeonApplicable
                    className={__User.search}
                    size={SIZE.MEDIUM}
                    label="Search"
                />
                <div style={{width: '1rem'}} />
                <NeonButton
                    className={__User.single}
                    size={SIZE.RELATIVE}
                >New</NeonButton>
            </div>
        );
    }
}
