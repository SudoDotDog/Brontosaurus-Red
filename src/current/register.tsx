/**
 * @author WMXPY
 * @namespace Current
 * @description Register
 */

import { SIGNAL } from "@sudoo/neon/declare";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonFromStructure, NeonSmartForm } from "@sudoo/neon/form";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { registerForOrganization } from "./repository/register";

type CurrentRegisterProp = {
} & RouteComponentProps;

export const CurrentRegister: React.FC<CurrentRegisterProp> = (props: CurrentRegisterProp) => {

    const [current, setCurrent] = React.useState<any>({});

    const [loading, setLoading] = React.useState<boolean>(false);
    const [cover, setCover] = React.useState<NeonStickerCut | undefined>(undefined);
    const [flag, setFlag] = React.useState<NeonFlagCut | undefined>(undefined);

    const form: NeonFromStructure = {
        username: {
            type: INPUT_TYPE.TEXT,
            display: 'Username',
        },
        displayName: {
            type: INPUT_TYPE.TEXT,
            display: 'Display Name',
        },
        email: {
            type: INPUT_TYPE.EMAIL,
            display: 'Email Address',
        },
        phone: {
            type: INPUT_TYPE.NUMBER,
            display: 'Phone Number',
        },
    };

    return (
        <React.Fragment>
            <GoBack />
            <NeonSmartForm
                loading={loading}
                form={form}
                title="Register Sub Account"
                submit="Register"
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

                    try {
                        const tempPassword: string = await registerForOrganization(
                            current.username,
                            current.displayName,
                            current.email,
                            current.phone,
                        );

                        setCover({
                            type: SIGNAL.SUCCEED,
                            title: "Succeed",

                            peek: {
                                children: "<-",
                                expend: "Complete",
                                onClick: props.history.goBack,
                            },
                        });

                        window.alert(`${current.username}'s temp new password is ${tempPassword}`);
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
                    setLoading(false);
                }}
            />
        </React.Fragment>
    );
};
