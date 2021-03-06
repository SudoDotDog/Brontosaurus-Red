/**
 * @author WMXPY
 * @namespace I18N
 * @description International
 */

import { LOCALE, SudooInternationalization } from "@sudoo/internationalization";
import { defaultLanguage } from "../state/preference/type";
import { ENGLISH_UNITED_STATES } from "./languages/en-us";
import { CHINESE_SIMPLIFIED } from "./languages/zh-cn";

export const intl: SudooInternationalization = SudooInternationalization.create(defaultLanguage);

intl.set(LOCALE.CHINESE_SIMPLIFIED, CHINESE_SIMPLIFIED)
    .set(LOCALE.ENGLISH_UNITED_STATES, ENGLISH_UNITED_STATES);
