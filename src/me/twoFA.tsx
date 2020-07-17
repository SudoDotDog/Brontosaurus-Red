/**
 * @author WMXPY
 * @namespace Me
 * @description Two FA
 */

import { SudooFormat } from "@sudoo/internationalization";
import { NeonButton } from "@sudoo/neon/button";
import { MARGIN, SIZE, WIDTH } from "@sudoo/neon/declare";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GoBack } from "../components/go-back";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { TitleManager } from "../util/title";
import { enable2FA } from "./repository/enable-2fa";

type MeEnable2FAProp = {
} & RouteComponentProps & ConnectedStates;

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export const MeEnable2FABase: React.FC<MeEnable2FAProp> = (props: MeEnable2FAProp) => {

    React.useEffect(() => {

        TitleManager.setNestedPage(PROFILE.MY_ACCOUNT, PROFILE.TWO_FACTOR_AUTHORIZATION);
        return () => TitleManager.restoreVoid();
    }, []);

    const [twoFA, setTwoFA] = React.useState<string | null>(null);

    return (
        <div>
            <GoBack />
            <NeonTitle margin={MARGIN.SMALL}>{props.language.get(PROFILE.TWO_FACTOR_AUTHORIZATION)}</NeonTitle>

            {twoFA ? <div>
                <NeonSub margin={MARGIN.SMALL}>{props.language.get(PROFILE.TWO_FACTOR_ENABLED)}</NeonSub>
                <img src={twoFA} />
            </div> : <div>
                    <NeonSub margin={MARGIN.SMALL}>{props.language.get(PROFILE.TWO_FACTOR_INTRO)}</NeonSub>
                    <NeonButton
                        margin={MARGIN.SMALL}
                        width={WIDTH.FULL}
                        size={SIZE.MEDIUM}
                        onClick={async () => {
                            const qrcode: string = await enable2FA();
                            setTwoFA(qrcode);
                        }}
                    > {props.language.get(PROFILE.ENABLE_RESET_TWO_FA)}</NeonButton>
                </div>}
        </div>
    );
};

export const MeEnable2FA: React.ComponentType<unknown> = connector.connect(MeEnable2FABase);
