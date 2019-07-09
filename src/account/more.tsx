/**
 * @author WMXPY
 * @namespace Account
 * @description More
 */

import { MARGIN } from "@sudoo/neon/declare";
import { NeonSub, NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";
import { deactivateAccount } from "./repository/deactivate";
import { limboAccount, LimboAccountResponse } from "./repository/limbo";
import { resetAttemptAccount } from "./repository/reset-attempt";
import { removeTwoFAAccount } from "./repository/twoFARemove";
import { withdrawOrganizationAccountRepository } from "./repository/withdraw-organization";

export type AccountMoreProps = {
} & RouteComponentProps;


const deactivateUser = async (username: string, goBack: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to deactivate ${username}?`);
    if (isConfirm) {
        try {
            await deactivateAccount(username);
            goBack();
        } catch (err) {
            window.alert(err);
        }
    }
};

const limboUser = async (username: string) => {

    const isConfirm: boolean = window.confirm(`Are you sure to reset ${username}'s password?`);
    if (isConfirm) {
        try {
            const response: LimboAccountResponse = await limboAccount(username);
            window.alert(`${username}'s temp new password is ${response.tempPassword}`);
        } catch (err) {
            window.alert(err);
        }
    }
};

const twoFARemoveUser = async (username: string) => {

    const isConfirm: boolean = window.confirm(`Are you sure to remove ${username}'s Two-Factor authenticator?`);
    if (isConfirm) {
        try {
            await removeTwoFAAccount(username);
        } catch (err) {
            window.alert(err);
        }
    }
};

const resetAttemptUser = async (username: string) => {

    const isConfirm: boolean = window.confirm(`Are you sure to reset ${username}'s Sign-in attempt count?`);
    if (isConfirm) {
        try {
            await resetAttemptAccount(username);
        } catch (err) {
            window.alert(err);
        }
    }
};

const withdrawOrganizationUser = async (username: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to remove ${username}'s organization?`);
    if (isConfirm) {
        try {
            await withdrawOrganizationAccountRepository(username);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

export const AccountMore: React.FC<AccountMoreProps> = (props: AccountMoreProps) => {

    const params: any = props.match.params;
    const username: string = decodeURIComponent(params.username);

    return (<div>
        <NeonSub onClick={() => props.history.goBack()}>Go Back</NeonSub>
        <NeonTitle margin={MARGIN.SMALL}>More about Account: {username}</NeonTitle>
        <div className={MenuStyle.menuGrid}>
            <MenuItem
                description={`Assign ${username} to an (another) organization`}
                link="Assign"
                onClick={() => props.history.push('/user/o/' + encodeURIComponent(username))}
            />
            <MenuItem
                description={`Deactivate ${username}`}
                link="Deactivate"
                onClick={() => deactivateUser(username, props.history.goBack)}
            />
            <MenuItem
                description={`Reset ${username}'s password and assign a temporary password.`}
                link="Limbo"
                onClick={() => limboUser(username)}
            />
            <MenuItem
                description={`Remove ${username}'s two-factoring authorization`}
                link="Remove 2FA"
                onClick={() => twoFARemoveUser(username)}
            />
            <MenuItem
                description={`Reset ${username}'s login attempt points`}
                link="Reset Attempt"
                onClick={() => resetAttemptUser(username)}
            />
            <MenuItem
                description={`Withdraw ${username}'s organization`}
                link="Withdraw"
                onClick={() => withdrawOrganizationUser(username, () => props.history.push('/user/e/' + username))}
            />
        </div>
    </div>);
};
