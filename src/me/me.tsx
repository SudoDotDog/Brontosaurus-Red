/**
 * @author WMXPY
 * @namespace Me
 * @description Me
 */

import { NeonButton } from "@sudoo/neon/button";
import { WIDTH } from "@sudoo/neon/declare";
import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
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
            <NeonSmartForm
                form={{
                    password: {
                        type: INPUT_TYPE.PASSWORD,
                        display: 'Password',
                    },
                    confirm: {
                        type: INPUT_TYPE.PASSWORD,
                        display: 'Confirm Password',
                    },
                }}
                title="Password Change"
                submit="Update"
                onSubmit={(result: any) => {
                    if (result.password === result.confirm) {
                        console.log(true);
                    } else {
                        console.log('error');
                    }
                }}
            />
        );
    }
}
