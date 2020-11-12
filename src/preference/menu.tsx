/**
 * @author WMXPY
 * @namespace Preference
 * @description Menu
 */

import { SudooFormat } from "@sudoo/internationalization";
import { Connector } from "@sudoo/redux";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import StyleMenu from "../../style/components/menu.scss";
import { MenuItem } from "../components/menu-item";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { IStore } from "../state/declare";
import { TitleManager } from "../util/title";

export type PreferenceMenuBaseProps = {
} & RouteComponentProps;

type ConnectedStates = {
    readonly language: SudooFormat;
};

const connector = Connector.create<IStore, ConnectedStates>()
    .connectStates(({ preference }: IStore) => ({
        language: intl.format(preference.language),
    }));

export type PreferenceMenuProps = PreferenceMenuBaseProps & ConnectedStates;

export const PreferenceMenuBase: React.FC<PreferenceMenuProps> = (props: PreferenceMenuProps) => {

    React.useEffect(() => {

        TitleManager.setSubPage(PROFILE.PREFERENCE);
        return () => TitleManager.restoreVoid();
    }, []);

    return (<div className={StyleMenu["menu-grid"]}>
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_AND_MANAGE_INSTANCE_SETTING,
                props.language.get(PROFILE.GLOBAL_PREFERENCES),
            )}
            link={props.language.get(PROFILE.GLOBAL_PREFERENCES)}
            onClick={() => props.history.push('/admin/preference/global')}
        />
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_AND_MANAGE_INSTANCE_SETTING,
                props.language.get(PROFILE.GLOBAL_BACKGROUND_IMAGES),
            )}
            link={props.language.get(PROFILE.GLOBAL_BACKGROUND_IMAGES)}
            onClick={() => props.history.push('/admin/preference/global-background-images')}
        />
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_AND_MANAGE_INSTANCE_SETTING,
                props.language.get(PROFILE.NAME_PREFERENCES),
            )}
            link={props.language.get(PROFILE.NAME_PREFERENCES)}
            onClick={() => props.history.push('/admin/preference/names')}
        />
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_AND_MANAGE_INSTANCE_SETTING,
                props.language.get(PROFILE.MAILER_TRANSPORT),
            )}
            link={props.language.get(PROFILE.MAILER_TRANSPORT)}
            onClick={() => props.history.push('/admin/preference/mailer-transport')}
        />
        <MenuItem
            description={props.language.get(
                PROFILE.VIEW_AND_MANAGE_INSTANCE_SETTING,
                props.language.get(PROFILE.MAILER_SOURCE),
            )}
            link={props.language.get(PROFILE.MAILER_SOURCE)}
            onClick={() => props.history.push('/admin/preference/mailer-source')}
        />
    </div>);
};

export const PreferenceMenu: React.ComponentType<PreferenceMenuBaseProps> = connector.connect(PreferenceMenuBase);
