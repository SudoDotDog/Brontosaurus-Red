/**
 * @author WMXPY
 * @namespace Util
 * @description Language
 */

import { LOCALE, SudooFormat } from "@sudoo/internationalization";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";

export const parseFormatter = (formatter: LOCALE | SudooFormat): SudooFormat => {

    if (typeof formatter === 'string') {

        return intl.format(formatter);
    }
    return formatter;
};

export const formatYNBoolean = (formatter: LOCALE | SudooFormat, bool?: boolean): string => {

    const language: SudooFormat = parseFormatter(formatter);

    if (Boolean(bool)) {
        return language.get(PROFILE.YES);
    }
    return language.get(PROFILE.NO);
};
