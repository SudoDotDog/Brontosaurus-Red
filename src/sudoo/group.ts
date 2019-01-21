/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Group
 */

import { Token } from "@brontosaurus/web";
import * as React from "react";
import { withBrontosaurus } from "./connect";
import { BrontosaurusEnabledForProps, BrontosaurusProps, WithAuthComponent } from "./declare";

export type EnableForGroupProp =
    {
        readonly group: string[];
        readonly placeholder?: any;

        readonly children?: any;
    }
    & BrontosaurusProps
    & BrontosaurusEnabledForProps;


export const EnableForGroupBase: React.ComponentType<EnableForGroupProp> = (props: EnableForGroupProp) => {

    if (props.visit) {

        const token: Token | null = props.auth.visit();

        if (token && token.groups) {

            const groups: string[] = token.groups;
            const valid: boolean = props.group.some((value: string) => groups.includes(value));

            return valid ? props.children : (props.placeholder || null);
        }

        return props.placeholder || null;
    } else {

        const token: Token = props.auth.strict();

        if (token && token.groups) {

            const groups: string[] = token.groups;
            const valid: boolean = props.group.some((value: string) => groups.includes(value));

            return valid ? props.children : (props.placeholder || null);
        }

        throw new Error('[Brontosaurus-React] Invalid Token');
    }
};

export const EnableForGroup: WithAuthComponent<EnableForGroupProp> = withBrontosaurus(EnableForGroupBase);
