/**
 * @author WMXPY
 * @namespace Me
 * @description Me
 */

import { SudooFormat } from "@sudoo/internationalization";
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
import { TitleManager } from "../util/title";
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

    React.useEffect(() => {

        TitleManager.setNestedPage(PROFILE.MY_ACCOUNT, PROFILE.CHANGE_PASSWORD);
        return () => TitleManager.restoreVoid();
    }, []);

    const [current, setCurrent] = React.useState<any>({});

    const [loading, setLoading] = React.useState<boolean>(false);
    const [cover, setCover] = React.useState<NeonStickerCut | undefined>(undefined);
    const [flag, setFlag] = React.useState<NeonFlagCut | undefined>(undefined);

    return (<div>
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
                            title: props.language.get(PROFILE.SUCCEED),

                            peek: {
                                children: "<-",
                                expend: props.language.get(PROFILE.COMPLETE),
                                onClick: () => {
                                    props.history.goBack();
                                },
                            },
                        });
                    } catch (err) {
                        setCover({
                            type: SIGNAL.ERROR,
                            title: props.language.get(PROFILE.FAILED),
                            info: err.message,

                            peek: {
                                children: "<-",
                                expend: props.language.get(PROFILE.RETRY),
                                onClick: () => setCover(undefined),
                            },
                        });
                    }
                } else {
                    setFlag({
                        type: SIGNAL.ERROR,
                        message: props.language.get(PROFILE.PASSWORD_NOT_MATCHED),
                    });
                }

                setLoading(false);
            }}
        />
    </div>);
};

export const MeChangePassword: React.ComponentType<unknown> = connector.connect(MeChangePasswordBase);
