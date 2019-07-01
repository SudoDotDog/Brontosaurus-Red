/**
 * @author WMXPY
 * @namespace Preference
 * @description Global
 */

import { SIGNAL } from "@sudoo/neon/declare";
import { NeonFlagCut, NeonStickerCut } from "@sudoo/neon/flag";
import { INPUT_TYPE, NeonFromStructure, NeonSmartForm } from "@sudoo/neon/form";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { namePreferenceRepository } from "./repository/names";

type NamesPreferenceProp = {
} & RouteComponentProps;

export const NamesPreference: React.FC<NamesPreferenceProp> = (props: NamesPreferenceProp) => {

    const [current, setCurrent] = React.useState<any>({});

    const [loading, setLoading] = React.useState<boolean>(false);
    const [cover, setCover] = React.useState<NeonStickerCut | undefined>(undefined);
    const [flag, setFlag] = React.useState<NeonFlagCut | undefined>(undefined);

    const form: NeonFromStructure = {
        systemName: {
            type: INPUT_TYPE.TEXT,
            display: 'System Name',
        },
        accountName: {
            type: INPUT_TYPE.TEXT,
            display: 'Account Name',
        },
    };

    return (
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
                    const changed: number = await namePreferenceRepository(
                        current.systemName,
                        current.accountName,
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
    );
};
