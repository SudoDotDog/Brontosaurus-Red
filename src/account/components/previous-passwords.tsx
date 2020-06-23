/**
 * @author WMXPY
 * @namespace Account_Components
 * @description Previous Passwords
 */

import { MARGIN, SIZE } from "@sudoo/neon/declare";
import { NeonApplicable } from "@sudoo/neon/input";
import { NeonSub } from "@sudoo/neon/typography";
import * as React from "react";
import { PreviousPassword } from "../../common/declare";
import { verifyPreviousPasswordRepository } from "../repository/verify-previous-password";

type AccountPreviousPasswordsProp = {

    readonly username: string;
    readonly namespace: string;
    readonly previousPasswordsCount: number;
};

type AccountPreviousPasswordsStates = {

    readonly testValue: string;
    readonly verifying: boolean;
    readonly verifyResult: PreviousPassword | null;
};

export class AccountPreviousPasswords extends React.Component<AccountPreviousPasswordsProp, AccountPreviousPasswordsStates> {

    public readonly state: AccountPreviousPasswordsStates = {

        testValue: '',
        verifying: false,
        verifyResult: null,
    };

    public render() {

        return (
            <div>
                <NeonSub>
                    Previous Passwords: {this.props.previousPasswordsCount}
                </NeonSub>
                <NeonApplicable
                    size={SIZE.MEDIUM}
                    margin={MARGIN.NONE}
                    label="Test Previous Password"
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
                Password has no matched record.
            </NeonSub>);
        }

        return (<NeonSub>
            Matched. Changed at: {this.state.verifyResult.changedAt.toLocaleString()}. Reason: {this.state.verifyResult.reason}.
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
