/**
 * @author WMXPY
 * @namespace Account
 * @description More
 */

import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { GoBack } from "../components/go-back";
import { MenuItem } from "../components/menu-item";
import { NamedTitle } from "../components/named-title";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { buildAdminAccountAssign, buildAdminAccountAttempts, buildAdminAccountEdit, buildAdminAccountResets } from "../util/path";
import { activateAccount } from "./repository/activate";
import { deactivateAccount } from "./repository/deactivate";
import { generateApplicationPasswordRepository, GenerateApplicationPasswordResponse } from "./repository/generate-application-password";
import { generateTemporaryPasswordRepository, GenerateTemporaryPasswordResponse } from "./repository/generate-temp-password";
import { limboAccount, LimboAccountResponse } from "./repository/limbo";
import { resetAttemptAccount } from "./repository/reset-attempt";
import { removeTwoFAAccount } from "./repository/twoFARemove";
import { withdrawOrganizationAccountRepository } from "./repository/withdraw-organization";
import { TitleManager } from "../util/title";

const activateUser = async (username: string, namespace: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to activate ${username}?`);
    if (isConfirm) {
        try {
            await activateAccount(username, namespace);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const deactivateUser = async (username: string, namespace: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to deactivate ${username}?`);
    if (isConfirm) {
        try {
            await deactivateAccount(username, namespace);
            next();
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

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

type AccountMoreProps = RouteComponentProps & ConnectedStates;

export const AccountMoreBase: React.FC<AccountMoreProps> = (props: AccountMoreProps) => {

    const params: any = props.match.params;
    const username: string = decodeURIComponent(params.username);
    const namespace: string = decodeURIComponent(params.namespace);

    React.useEffect(() => {

        TitleManager.setNestedPage(PROFILE.ACCOUNT, PROFILE.MORE, username);
        return () => TitleManager.restoreVoid();
    }, []);

    return (<div>
        <GoBack
            right={props.language.get(PROFILE.EDIT)}
            onClickRight={() => props.history.push(buildAdminAccountEdit(username, namespace))}
        />
        <NamedTitle about={props.language.get(
            PROFILE.MORE_ABOUT,
            props.language.get(PROFILE.ACCOUNT),
        )}>
            {username}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={props.language.get(
                    PROFILE.ASSIGN_TO_ORGANIZATION,
                    username,
                )}
                link={props.language.get(PROFILE.ASSIGN)}
                onClick={() => props.history.push(buildAdminAccountAssign(username, namespace))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.VIEW_ATTEMPTS_OF_INSTANCE,
                    username,
                    props.language.get(PROFILE.ACCOUNT),
                )}
                link={props.language.get(PROFILE.ATTEMPTS)}
                onClick={() => props.history.push(buildAdminAccountAttempts(username, namespace))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.VIEW_RESETS_OF_INSTANCE,
                    username,
                    props.language.get(PROFILE.ACCOUNT),
                )}
                link={props.language.get(PROFILE.RESETS)}
                onClick={() => props.history.push(buildAdminAccountResets(username, namespace))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.ACTIVATE_INSTANCE,
                    username,
                    props.language.get(PROFILE.ACCOUNT),
                )}
                link={props.language.get(PROFILE.ACTIVATE)}
                onClick={() => activateUser(username, namespace, () => {
                    props.history.push(buildAdminAccountEdit(username, namespace));
                })}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.DEACTIVATE_INSTANCE,
                    username,
                    props.language.get(PROFILE.ACCOUNT),
                )}
                link={props.language.get(PROFILE.DEACTIVATE)}
                dangerous
                onClick={() => deactivateUser(username, namespace, () => {
                    props.history.push(buildAdminAccountEdit(username, namespace));
                })}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.LIMBO_DESCRIPTION_OF_INSTANCE,
                    username,
                )}
                link={props.language.get(PROFILE.LIMBOLIZE)}
                dangerous
                onClick={() => limboUser(username, namespace)}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.REMOVE_TWO_FA_OF_INSTANCE,
                    props.language.get(PROFILE.ACCOUNT),
                    username,
                )}
                link={props.language.get(PROFILE.REMOVE_TWO_FA)}
                dangerous
                onClick={() => twoFARemoveUser(username, namespace)}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.RESET_ATTEMPT_POINTS_OF_INSTANCE,
                    props.language.get(PROFILE.ACCOUNT),
                    username,
                )}
                link={props.language.get(PROFILE.RESET_ATTEMPT_POINTS)}
                dangerous
                onClick={() => resetAttemptUser(username, namespace)}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.WITHDRAW_FROM_OF_INSTANCE,
                    props.language.get(PROFILE.ORGANIZATION),
                    props.language.get(PROFILE.ACCOUNT),
                    username,
                )}
                link={props.language.get(PROFILE.WITHDRAW)}
                dangerous
                onClick={() => withdrawOrganizationUser(username, namespace, () => props.history.push(buildAdminAccountEdit(username, namespace)))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.GENERATE_SOMETHING_FOR_INSTANCE,
                    props.language.get(PROFILE.TEMPORARY_PASSWORD),
                    props.language.get(PROFILE.ACCOUNT),
                    username,
                )}
                link={props.language.get(
                    PROFILE.GENERATE_SOMETHING,
                    props.language.get(PROFILE.TEMPORARY_PASSWORD),
                )}
                dangerous
                onClick={() => generateTemporaryPassword(username, namespace, () => props.history.push(buildAdminAccountEdit(username, namespace)))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.GENERATE_SOMETHING_FOR_INSTANCE,
                    props.language.get(PROFILE.APPLICATION_PASSWORD),
                    props.language.get(PROFILE.ACCOUNT),
                    username,
                )}
                link={props.language.get(
                    PROFILE.GENERATE_SOMETHING,
                    props.language.get(PROFILE.APPLICATION_PASSWORD),
                )}
                dangerous
                onClick={() => generateApplicationPassword(username, namespace, () => props.history.push(buildAdminAccountEdit(username, namespace)))}
            />
        </div>
    </div>);
};

export const AccountMore: React.ComponentType = connector.connect(AccountMoreBase);
