/**
 * @author WMXPY
 * @namespace Group
 * @description Group
 */

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

type GroupProp = {
} & RouteComponentProps;


export const Group: React.SFC<GroupProp> = (props: GroupProp) => {

    return (<div>
        Group
    </div>);
};
