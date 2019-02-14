/**
 * @author WMXPY
 * @namespace Me
 * @description Me
 */

import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { editPassword } from "./repository/change-password";

type MeProp = {
} & RouteComponentProps;

export const Me: React.FC<MeProp> = (props: MeProp) => {

    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState(false);

    return (
        <NeonSmartForm
            loading={loading}
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

                setLoading(true);
                if (result.password === result.confirm) {
                    editPassword(result.password);
                } else {
                    console.log('error');
                }
            }}
        />
    );
};
