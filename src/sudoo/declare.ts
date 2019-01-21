/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Declare
 */

import { Token } from "@brontosaurus/web";
import * as React from "react";

export type BrontosaurusProps = {

    readonly auth: {
        readonly visit: () => (Token | null);
        readonly strict: () => Token;
    };
};

export type ExcludeAuth<T extends BrontosaurusProps> = Pick<T, Exclude<keyof T, 'brontosaurus'>>;
export type WithAuthComponent<T extends BrontosaurusProps> = React.ComponentType<ExcludeAuth<T>>;
