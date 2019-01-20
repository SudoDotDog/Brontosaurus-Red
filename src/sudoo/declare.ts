/**
 * @author WMXPY
 * @namespace Brontosaurus_React
 * @description Declare
 */

export enum BrontosaurusMode {

    VISITOR = "VISITOR",
    STRICT = "STRICT",
}

export type BrontosaurusInfo = {

    mode: BrontosaurusMode;
};

export const getDefaultInfo = (): BrontosaurusInfo => ({
    mode: BrontosaurusMode.STRICT,
});
