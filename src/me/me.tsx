/**
 * @author WMXPY
 * @namespace Me
 * @description Me
 */

import { FLAG_TYPE } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonSmartForm, NeonSmartFormShort } from "@sudoo/neon/form";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { editPassword } from "./repository/change-password";

type MeProp = {
} & RouteComponentProps;

export const Me: React.FC<MeProp> = (props: MeProp) => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [cover, setCover] = React.useState<NeonSmartFormShort | undefined>(undefined);
    const [flag, setFlag] = React.useState<NeonSmartFormShort | undefined>(undefined);

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
            cover={cover}
            flag={flag}
            onSubmit={async (result: any) => {

                setCover(undefined);
                setFlag(undefined);

                setLoading(true);
                if (result.password === result.confirm) {
                    try {
                        await editPassword(result.password);
                    } catch (err) {
                        setCover({
                            type: FLAG_TYPE.ERROR,
                            message: "Failed",
                            info: err.message,
                        });
                    }
                } else {
                    setFlag({
                        type: FLAG_TYPE.ERROR,
                        message: "Password not matched",
                    });
                }

                setLoading(false);
            }}
        />
    );
};
