/**
 * @author WMXPY
 * @namespace Decorator
 * @description More
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as MenuStyle from "../../style/components/menu.scss";
import { GoBack } from "../components/go-back";
import { MenuItem } from "../components/menu-item";
import { NamedTitle } from "../components/named-title";
import { buildAdminDecoratorMembers } from "../util/path";

export type DecoratorMoreProps = {
} & RouteComponentProps;

export const DecoratorMore: React.FC<DecoratorMoreProps> = (props: DecoratorMoreProps) => {

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
        </div>
    </div>);
};
