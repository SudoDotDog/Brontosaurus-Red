/**
 * @author WMXPY
 * @namespace Me
 * @description Me
 */

import { SudooFormat } from "@sudoo/internationalization/dist/format";
import { SIGNAL } from "@sudoo/neon/declare";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonSmartForm } from "@sudoo/neon/form";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { editPassword } from "./repository/change-password";

type MeChangePasswordProp = {
} & RouteComponentProps & ConnectedStates;

type ConnectedStates = {

    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({

        language: intl.format(preference.language),
    }));

export const MeChangePasswordBase: React.FC<MeChangePasswordProp> = (props: MeChangePasswordProp) => {

    const [current, setCurrent] = React.useState<any>({});

    const [loading, setLoading] = React.useState<boolean>(false);
    const [cover, setCover] = React.useState<NeonStickerCut | undefined>(undefined);
    const [flag, setFlag] = React.useState<NeonFlagCut | undefined>(undefined);

    return (
        <div>
            <GoBack />
            <NeonSmartForm
                loading={loading}
                form={{
                    password: {
                        type: INPUT_TYPE.PASSWORD,
                        display: props.language.get(PROFILE.PASSWORD),
                    },
                    confirm: {
                        type: INPUT_TYPE.PASSWORD,
                        display: props.language.get(PROFILE.CONFIRM_PASSWORD),
                    },
                }}
                title={props.language.get(PROFILE.CHANGE_PASSWORD)}
                submit={props.language.get(PROFILE.UPDATE)}
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
        </div>
    );
};

export const MeChangePassword: React.ComponentType<{}> = connector.connect(MeChangePasswordBase);
