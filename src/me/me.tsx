/**
 * @author WMXPY
 * @namespace Me
 * @description Me
 */

import { FLAG_TYPE, NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { editPassword } from "./repository/change-password";

type MeProp = {
} & RouteComponentProps;

export const Me: React.FC<MeProp> = (props: MeProp) => {

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
            onSubmit={async (result: any) => {

                setCover(undefined);
                setFlag(undefined);

                setLoading(true);
                if (result.password === result.confirm) {
                    try {
                        await editPassword(result.password);

                        setCover({
                            type: FLAG_TYPE.SUCCEED,
                            title: "Succeed",

                            peek: {
                                text: "<-",
                                expend: "Complete",
                                onClick: props.history.goBack,
                            },
                        });
                    } catch (err) {
                        setCover({
                            type: FLAG_TYPE.ERROR,
                            title: "Failed",
                            info: err.message,

                            peek: {
                                text: "<-",
                                expend: "Retry",
                                onClick: () => setCover(undefined),
                            },
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
