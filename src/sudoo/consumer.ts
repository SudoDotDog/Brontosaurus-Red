/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Consumer
 */

import * as React from "react";
import { BrontosaurusInfo } from "./declare";
import { BrontosaurusProvider } from "./provider";

export type InfoProps = {

    info: BrontosaurusInfo;
};

export type ExcludeInfo<T extends InfoProps> = Pick<T, Exclude<keyof T, 'info'>>;
export type InformedComponent<T extends InfoProps> = React.ComponentType<ExcludeInfo<T>>;

export const withBrontosaurus = <T extends InfoProps>(Component: any): React.ComponentType<ExcludeInfo<T>> =>

    <P extends React.Props<T>>(originProps: P) =>

        React.createElement(BrontosaurusProvider, {} as any, (context: BrontosaurusInfo) =>

            React.createElement(Component, {
                ...originProps,
                info: context,
            }, originProps.children),
        );
