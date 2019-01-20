/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Provider
 */

import * as React from "react";
import { BrontosaurusInfo, getDefaultInfo } from "./declare";

const BrontosaurusContext: React.Context<BrontosaurusInfo> = React.createContext<BrontosaurusInfo>(getDefaultInfo());

export const BrontosaurusConsumer = BrontosaurusContext.Consumer;
export const BrontosaurusProvider: React.ComponentType<React.ProviderProps<Partial<BrontosaurusInfo>>> = (props: React.ProviderProps<Partial<BrontosaurusInfo>>) => {

    const defaultInfo: BrontosaurusInfo = getDefaultInfo();
    const combinedInfo: BrontosaurusInfo = {
        ...defaultInfo,
        ...props.value,
    };

    return React.createElement(BrontosaurusContext.Provider, {
        value: combinedInfo,
    }, props.children);
};
