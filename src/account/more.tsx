/**
 * @author WMXPY
 * @namespace Account
 * @description More
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { GoBack } from "../components/go-back";
import { MenuItem } from "../components/menu-item";
import { NamedTitle } from "../components/named-title";
import { buildAdminAccountAssign, buildAdminAccountAttempts, buildAdminAccountEdit, buildAdminAccountResets } from "../util/path";
import { activateAccount } from "./repository/activate";
import { deactivateAccount } from "./repository/deactivate";
import { generateApplicationPasswordRepository, GenerateApplicationPasswordResponse } from "./repository/generate-application-password";
import { generateTemporaryPasswordRepository, GenerateTemporaryPasswordResponse } from "./repository/generate-temp-password";
import { limboAccount, LimboAccountResponse } from "./repository/limbo";
import { resetAttemptAccount } from "./repository/reset-attempt";
import { removeTwoFAAccount } from "./repository/twoFARemove";
import { withdrawOrganizationAccountRepository } from "./repository/withdraw-organization";

export type AccountMoreProps = {
} & RouteComponentProps;

const activateUser = async (username: string, namespace: string, goBack: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to activate ${username}?`);
    if (isConfirm) {
        try {
            await activateAccount(username, namespace);
            goBack();
        } catch (err) {
            window.alert(err);
        }
    }
};

const deactivateUser = async (username: string, namespace: string, goBack: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to deactivate ${username}?`);
    if (isConfirm) {
        try {
            await deactivateAccount(username, namespace);
            goBack();
        } catch (err) {
            window.alert(err);
        }
    }
};

const limboUser = async (username: string, namespace: string) => {

    const isConfirm: boolean = window.confirm(`Are you sure to reset ${username}'s password?`);
    if (isConfirm) {
        try {
            const response: LimboAccountResponse = await limboAccount(username, namespace);
            window.alert(`${username}'s temp new password is ${response.tempPassword}`);
        } catch (err) {
            window.alert(err);
        }
    }
};

const twoFARemoveUser = async (username: string, namespace: string) => {

    const isConfirm: boolean = window.confirm(`Are you sure to remove ${username}'s Two-Factor authenticator?`);
    if (isConfirm) {
        try {
            await removeTwoFAAccount(username, namespace);
        } catch (err) {
            window.alert(err);
        }
    }
};

const resetAttemptUser = async (username: string, namespace: string) => {

    const isConfirm: boolean = window.confirm(`Are you sure to reset ${username}'s Sign-in attempt count?`);
    if (isConfirm) {
        try {
            await resetAttemptAccount(username, namespace);
        } catch (err) {
            window.alert(err);
        }
    }
};

const withdrawOrganizationUser = async (username: string, namespace: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to remove ${username}'s organization?`);
    if (isConfirm) {
        try {
            await withdrawOrganizationAccountRepository(username, namespace);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const generateTemporaryPassword = async (username: string, namespace: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to generate a temporary password for ${username}`);
    if (isConfirm) {
        try {
            const result: GenerateTemporaryPasswordResponse = await generateTemporaryPasswordRepository(username, namespace);
            alert(`Temporary Password for ${result.username} is ${result.password}`);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const generateApplicationPassword = async (username: string, namespace: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to generate a application password for ${username}`);
    if (isConfirm) {
        try {
            const result: GenerateApplicationPasswordResponse = await generateApplicationPasswordRepository(username, namespace);
            alert(`Application Password for ${result.username} is ${result.password}`);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

export const AccountMore: React.FC<AccountMoreProps> = (props: AccountMoreProps) => {

    const params: any = props.match.params;
    const username: string = decodeURIComponent(params.username);
    const namespace: string = decodeURIComponent(params.namespace);

    return (<div>
        <GoBack
            right="Edit"
            onClickRight={() => props.history.push(buildAdminAccountEdit(username, namespace))}
        />
        <NamedTitle about="More About Account">
            {username}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={`Assign ${username} to an (another) organization`}
                link="Assign"
                onClick={() => props.history.push(buildAdminAccountAssign(username, namespace))}
            />
            <MenuItem
                description={`Check ${username}'s attempt history`}
                link="Attempts"
                onClick={() => props.history.push(buildAdminAccountAttempts(username, namespace))}
            />
            <MenuItem
                description={`Check ${username}'s reset history`}
                link="Resets"
                onClick={() => props.history.push(buildAdminAccountResets(username, namespace))}
            />
            <MenuItem
                description={`Activate ${username}`}
                link="Activate"
                onClick={() => activateUser(username, namespace, () => {
                    props.history.goBack();
                })}
            />
            <MenuItem
                description={`Deactivate ${username}`}
                link="Deactivate"
                onClick={() => deactivateUser(username, namespace, () => {
                    props.history.goBack();
                })}
            />
            <MenuItem
                description={`Reset ${username}'s password and assign a temporary password.`}
                link="Limbo"
                onClick={() => limboUser(username, namespace)}
            />
            <MenuItem
                description={`Remove ${username}'s two-factoring authorization`}
                link="Remove 2FA"
                onClick={() => twoFARemoveUser(username, namespace)}
            />
            <MenuItem
                description={`Reset ${username}'s login attempt points`}
                link="Reset Attempt"
                onClick={() => resetAttemptUser(username, namespace)}
            />
            <MenuItem
                description={`Withdraw ${username}'s organization`}
                link="Withdraw"
                onClick={() => withdrawOrganizationUser(username, namespace, () => props.history.push(buildAdminAccountEdit(username, namespace)))}
            />
            <MenuItem
                description={`Generate a Temporary Password for ${username}`}
                link="Generate Temporary Password"
                onClick={() => generateTemporaryPassword(username, namespace, () => props.history.push(buildAdminAccountEdit(username, namespace)))}
            />
            <MenuItem
                description={`Generate a Application Password for ${username}`}
                link="Generate Application Password"
                onClick={() => generateApplicationPassword(username, namespace, () => props.history.push(buildAdminAccountEdit(username, namespace)))}
            />
        </div>
    </div>);
};
