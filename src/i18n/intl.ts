/**
 * @author WMXPY
 * @namespace I18N
 * @description International
 */

import { LOCALE, SudooInternationalization } from "@sudoo/internationalization";
import { defaultLanguage } from "../state/preference/type";
import { CHINESE_SIMPLIFIED, ENGLISH_UNITED_STATES } from "./all";

export const intl: SudooInternationalization = SudooInternationalization.create(defaultLanguage);

intl.set(LOCALE.CHINESE_SIMPLIFIED, CHINESE_SIMPLIFIED)
    .set(LOCALE.ENGLISH_UNITED_STATES, ENGLISH_UNITED_STATES);
