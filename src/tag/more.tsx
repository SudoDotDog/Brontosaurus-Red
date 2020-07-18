/**
 * @author WMXPY
 * @namespace Tag
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
import { buildAdminTagEdit, buildAdminTagMembers } from "../util/path";
import { activateTagRepository } from "./repository/activate";
import { deactivateTagRepository } from "./repository/deactivate";
import { TitleManager } from "../util/title";

const activateTag = async (tag: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to activate "${tag}"?`);
    if (isConfirm) {
        try {
            await activateTagRepository(tag);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const deactivateTag = async (tag: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to deactivate "${tag}"?`);
    if (isConfirm) {
        try {
            await deactivateTagRepository(tag);
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

type TagMoreProps = RouteComponentProps & ConnectedStates;

export const TagMoreBase: React.FC<TagMoreProps> = (props: TagMoreProps) => {

    const params: any = props.match.params;
    const tag: string = decodeURIComponent(params.tag);

    React.useEffect(() => {

        TitleManager.setNestedPage(PROFILE.TAG, PROFILE.MORE, tag);
        return () => TitleManager.restoreVoid();
    }, []);

    return (<div>
        <GoBack
            right={props.language.get(PROFILE.EDIT)}
            onClickRight={() => {
                props.history.push(
                    buildAdminTagEdit(tag),
                );
            }}
        />
        <NamedTitle about={props.language.get(
            PROFILE.MORE_ABOUT,
            props.language.get(PROFILE.TAGS)
        )}>
            {tag}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={props.language.get(
                    PROFILE.VIEW_MEMBERS_OF_INSTANCE,
                    tag,
                    props.language.get(PROFILE.TAGS),
                )}
                link={props.language.get(PROFILE.MEMBERS)}
                onClick={() => props.history.push(buildAdminTagMembers(tag))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.ACTIVATE_INSTANCE,
                    tag,
                    props.language.get(PROFILE.TAGS),
                )}
                link={props.language.get(PROFILE.ACTIVATE)}
                onClick={() => activateTag(tag, () => props.history.replace(buildAdminTagEdit(tag)))}
            />
            <MenuItem
                description={props.language.get(
                    PROFILE.DEACTIVATE_INSTANCE,
                    tag,
                    props.language.get(PROFILE.TAGS),
                )}
                link={props.language.get(PROFILE.DEACTIVATE)}
                dangerous
                onClick={() => deactivateTag(tag, () => props.history.replace(buildAdminTagEdit(tag)))}
            />
        </div>
    </div>);
};

export const TagMore: React.ComponentType = connector.connect(TagMoreBase);
