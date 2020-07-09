/**
 * @author WMXPY
 * @namespace Account_Components
 * @description Previous Passwords
 */

import { SudooFormat } from "@sudoo/internationalization";
import { MARGIN, SIZE } from "@sudoo/neon/declare";
import { NeonApplicable } from "@sudoo/neon/input";
import { NeonSub } from "@sudoo/neon/typography";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { PreviousPassword } from "../../common/declare";
import { intl } from "../../i18n/intl";
import { IStore } from "../../state/declare";
import { verifyPreviousPasswordRepository } from "../repository/verify-previous-password";
import { PROFILE } from "../../i18n/profile";

type AccountPreviousPasswordsBaseProp = {

    readonly username: string;
    readonly namespace: string;
    readonly previousPasswordsCount: number;
};

type AccountPreviousPasswordsStates = {

    readonly testValue: string;
    readonly verifying: boolean;
    readonly verifyResult: PreviousPassword | null;
};

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type AccountPreviousPasswordsProp = AccountPreviousPasswordsBaseProp & ConnectedStates;

export class AccountPreviousPasswordsBase extends React.Component<AccountPreviousPasswordsProp, AccountPreviousPasswordsStates> {

    public readonly state: AccountPreviousPasswordsStates = {

        testValue: '',
        verifying: false,
        verifyResult: null,
    };

    public render() {

        return (
            <div>
                <NeonSub>
                    {this.props.language.get(
                        PROFILE.PREVIOUS_PASSWORDS_COUNT,
                        this.props.previousPasswordsCount.toString(),
                    )}
                </NeonSub>
                <NeonApplicable
                    size={SIZE.MEDIUM}
                    margin={MARGIN.SMALL}
                    label={this.props.language.get(PROFILE.TEST_PREVIOUS_PASSWORD)}
                    onApply={(password: string) => {
                        this._verifyPreviousPassword(password);
                    }}
                />
                {this._renderVerifyStatus()}
            </div>
        );
    }

    private _renderVerifyStatus() {

        if (!this.state.verifying) {
            return null;
        }

        if (!this.state.verifyResult) {
            return (<NeonSub>
                {this.props.language.get(PROFILE.PREVIOUS_PASSWORD_HAS_NO_MATCHED_RECORD)}
            </NeonSub>);
        }

        return (<NeonSub>
            {this.props.language.get(
                PROFILE.PREVIOUS_PASSWORD_MATCHED_WITH_INSTANCE,
                this.state.verifyResult.changedAt.toLocaleString(),
                this.state.verifyResult.reason,
            )}
        </NeonSub>);
    }

    private async _verifyPreviousPassword(password: string): Promise<void> {

        const result: PreviousPassword | null = await verifyPreviousPasswordRepository(this.props.username, this.props.namespace, password);

        this.setState({
            verifying: true,
            verifyResult: result,
        })
    }
}

export const AccountPreviousPasswords: React.ComponentType<AccountPreviousPasswordsBaseProp> = connector.connect(AccountPreviousPasswordsBase);
