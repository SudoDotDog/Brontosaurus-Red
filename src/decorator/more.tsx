/**
 * @author WMXPY
 * @namespace Decorator
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
import { IStore } from "../state/declare";
import { buildAdminDecoratorEdit, buildAdminDecoratorMembers } from "../util/path";
import { activateDecoratorRepository } from "./repository/activate";
import { deactivateDecoratorRepository } from "./repository/deactivate";

const activateDecorator = async (decorator: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to activate "${decorator}"?`);
    if (isConfirm) {
        try {
            await activateDecoratorRepository(decorator);
            next();
        } catch (err) {
            window.alert(err);
        }
    }
};

const deactivateDecorator = async (decorator: string, next: () => void) => {

    const isConfirm: boolean = window.confirm(`Are you sure to deactivate "${decorator}"?`);
    if (isConfirm) {
        try {
            await deactivateDecoratorRepository(decorator);
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

type DecoratorMoreProps = RouteComponentProps & ConnectedStates;

export const DecoratorMoreBase: React.FC<DecoratorMoreProps> = (props: DecoratorMoreProps) => {

    const params: any = props.match.params;
    const decorator: string = decodeURIComponent(params.decorator);

    return (<div>
        <GoBack
            right="Edit"
            onClickRight={() => props.history.push('/admin/decorator/e/' + encodeURIComponent(decorator))}
        />
        <NamedTitle about="More About Decorator">
            {decorator}
        </NamedTitle>
        <div className={MenuStyle["menu-grid"]}>
            <MenuItem
                description={`See Members of "${decorator}"`}
                link="Members"
                onClick={() => props.history.push(buildAdminDecoratorMembers(decorator))}
            />
            <MenuItem
                description={`Activate "${decorator}"`}
                link="Activate"
                onClick={() => activateDecorator(decorator, () => props.history.replace(buildAdminDecoratorEdit(decorator)))}
            />
            <MenuItem
                description={`Deactivate "${decorator}"`}
                link="Deactivate"
                onClick={() => deactivateDecorator(decorator, () => props.history.replace(buildAdminDecoratorEdit(decorator)))}
            />
        </div>
    </div>);
};

export const DecoratorMore: React.ComponentType = connector.connect(DecoratorMoreBase);
