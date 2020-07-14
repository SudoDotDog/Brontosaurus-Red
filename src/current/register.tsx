/**
 * @author WMXPY
 * @namespace Current
 * @description Register
 */

import { DEFAULT_BRONTOSAURUS_NAMESPACE } from "@brontosaurus/definition";
import { SudooFormat } from "@sudoo/internationalization";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonFromStructure, NeonSmartForm } from "@sudoo/neon/form";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { createFailedCover, createSucceedCover } from "../util/cover";
import { registerForOrganization } from "./repository/register";

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type CurrentRegisterProp = RouteComponentProps & ConnectedStates;

export const CurrentRegisterBase: React.FC<CurrentRegisterProp> = (props: CurrentRegisterProp) => {

    const [current, setCurrent] = React.useState<Record<string, any>>({
        namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT,
    });

    const [loading, setLoading] = React.useState<boolean>(false);
    const [cover, setCover] = React.useState<NeonStickerCut | undefined>(undefined);
    const [flag, setFlag] = React.useState<NeonFlagCut | undefined>(undefined);

    const form: NeonFromStructure = {
        username: {
            type: INPUT_TYPE.TEXT,
            display: props.language.get(PROFILE.USERNAME),
        },
        namespace: {
            type: INPUT_TYPE.TEXT,
            display: props.language.get(PROFILE.NAMESPACE),
        },
        displayName: {
            type: INPUT_TYPE.TEXT,
            display: props.language.get(PROFILE.DISPLAY_NAME),
        },
        email: {
            type: INPUT_TYPE.EMAIL,
            display: props.language.get(PROFILE.EMAIL),
        },
        phone: {
            type: INPUT_TYPE.NUMBER,
            display: props.language.get(PROFILE.PHONE),
        },
    };

    return (
        <React.Fragment>
            <GoBack />
            <NeonSmartForm
                loading={loading}
                form={form}
                title={props.language.get(PROFILE.REGISTER_SUB_ACCOUNT)}
                submit={props.language.get(PROFILE.REGISTER)}
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
                            current.namespace,
                            current.displayName,
                            current.email,
                            current.phone,
                        );

                        setCover(createSucceedCover(
                            props.language,
                            tempPassword,
                            () => props.history.goBack(),
                        ));

                        window.alert(`${current.username}'s temp new password is ${tempPassword}`);
                    } catch (err) {

                        setCover(createFailedCover(
                            props.language,
                            err.message,
                            () => setCover(undefined),
                        ));
                    }
                    setLoading(false);
                }}
            />
        </React.Fragment>
    );
};

export const CurrentRegister: React.ComponentType = connector.connect(CurrentRegisterBase);
