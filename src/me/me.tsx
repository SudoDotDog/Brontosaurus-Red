/**
 * @author WMXPY
 * @namespace Me
 * @description Me
 */

import { SIGNAL } from "@sudoo/neon/declare";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { editPassword } from "./repository/change-password";

type MeProp = {
} & RouteComponentProps;

export const Me: React.FC<MeProp> = (props: MeProp) => {

    const [current, setCurrent] = React.useState<any>({});

    const [loading, setLoading] = React.useState<boolean>(false);
    const [cover, setCover] = React.useState<NeonStickerCut | undefined>(undefined);
    const [flag, setFlag] = React.useState<NeonFlagCut | undefined>(undefined);

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
            value={current}
            onChange={(result: any) => {
                setCurrent(result);
            }}
            onSubmit={async () => {

                setCover(undefined);
                setFlag(undefined);

                setLoading(true);
                if (current.password === current.confirm) {
                    try {
                        await editPassword(current.password);

                        setCover({
                            type: SIGNAL.SUCCEED,
                            title: "Succeed",

                            peek: {
                                children: "<-",
                                expend: "Complete",
                                onClick: props.history.goBack,
                            },
                        });
                    } catch (err) {
                        setCover({
                            type: SIGNAL.ERROR,
                            title: "Failed",
                            info: err.message,

                            peek: {
                                children: "<-",
                                expend: "Retry",
                                onClick: () => setCover(undefined),
                            },
                        });
                    }
                } else {
                    setFlag({
                        type: SIGNAL.ERROR,
                        message: "Password not matched",
                    });
                }

                setLoading(false);
            }}
        />
    );
};
