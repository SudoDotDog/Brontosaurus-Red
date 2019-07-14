/**
 * @author WMXPY
 * @namespace Me
 * @description Two FA
 */

import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { enable2FA } from "./repository/enable-2fa";

type MeEnable2FAProp = {
} & RouteComponentProps;

export const MeEnable2FA: React.FC<MeEnable2FAProp> = (props: MeEnable2FAProp) => {

    const [twoFA, setTwoFA] = React.useState<string | null>(null);

    return (
        <div>
            <GoBack />
            <NeonTitle margin={MARGIN.SMALL}>Two-factor Authenticator</NeonTitle>

            {
                twoFA
                    ? <div>
                        <NeonSub margin={MARGIN.SMALL}>
                            Two-factor Authenticator enable on your account, please scan the following QRCode with your mobile device. This information will only available for you once.
                        </NeonSub>
                        <img src={twoFA} />
                    </div>
                    : <div>
                        <NeonSub margin={MARGIN.SMALL}>Click the following button to enable or reset 2FA for your account.</NeonSub>
                        <NeonButton
                            margin={MARGIN.SMALL}
                            width={WIDTH.FULL}
                            size={SIZE.MEDIUM}
                            onClick={async () => {
                                const qrcode: string = await enable2FA();
                                setTwoFA(qrcode);
                            }}
                        >
                            Enable/Reset 2FA
                        </NeonButton>
                    </div>
            }
        </div>
    );
};
