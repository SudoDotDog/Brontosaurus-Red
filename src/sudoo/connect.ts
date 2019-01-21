/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Connect
 */

import { Brontosaurus } from "@brontosaurus/web";
import * as React from "react";
import { BrontosaurusProps, ExcludeAuth } from "./declare";

export const withBrontosaurus = <T extends BrontosaurusProps>(Component: any): React.ComponentType<ExcludeAuth<T>> =>

    <P extends React.Props<T>>(originProps: P) =>

        React.createElement(Component, {
            ...originProps,
            auth: {
                visit: () => Brontosaurus.rummage(),
                strict: () => Brontosaurus.token(),
            },
        });
