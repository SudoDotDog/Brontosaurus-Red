/**
 * @author WMXPY
 * @namespace Util
 * @description Cover
 */

import { SudooFormat } from "@sudoo/internationalization";
import { SIGNAL } from "@sudoo/neon/declare";
import { NeonStickerCut } from "@sudoo/neon/flag";
import { PROFILE } from "../i18n/profile";

export const createSucceedCover = (
    language: SudooFormat,
    info: string,
    peek: () => void,
): NeonStickerCut => {

    return {
        type: SIGNAL.SUCCEED,
        title: language.get(PROFILE.SUCCEED),
        info,

        peek: {
            children: "<-",
            expend: language.get(PROFILE.COMPLETE),
            onClick: peek,
        },
    };
};

export const createFailedCover = (
    language: SudooFormat,
    info: string,
    peek: () => void,
): NeonStickerCut => {

    return {
        type: SIGNAL.ERROR,
        title: language.get(PROFILE.FAILED),
        info,

        peek: {
            children: "<-",
            expend: language.get(PROFILE.RETRY),
            onClick: peek,
        },
    };
};
