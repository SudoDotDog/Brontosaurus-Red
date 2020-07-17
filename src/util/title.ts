/**
 * @author WMXPY
 * @namespace Util
 * @description Title
 */

import { getSystemLanguage, LOCALE, SudooFormat } from "@sudoo/internationalization";
import { Title } from "@sudoo/title";
import { intl } from "../i18n/intl";
import { PROFILE } from "../i18n/profile";
import { defaultLanguage } from "../state/preference/type";

export class TitleManager {

    private static readonly _instance: TitleManager = new TitleManager();

    public static setInit(title: string): TitleManager {

        const instance: TitleManager = this.instance;
        instance.setInit(title);
        return instance;
    }

    public static setSubPage(profile: PROFILE): TitleManager {

        const instance: TitleManager = this.instance;
        instance.setSubPage(profile);
        return instance;
    }

    public static restore(): TitleManager {

        const instance: TitleManager = this.instance;
        instance.restore();
        return instance;
    }

    public static get instance(): TitleManager {

        return this._instance;
    }

    private readonly _title: Title;

    private _language: LOCALE;

    private constructor() {

        this._title = Title.create();

        const checkedDefaultLanguage: LOCALE = getSystemLanguage(defaultLanguage);
        this._language = checkedDefaultLanguage;
    }

    public setLanguage(language: LOCALE): this {

        this._language = language;
        return this;
    }

    public setInit(title: string): this {

        this._title.setInit(title);
        this._title.setLevelBase(`{} | ${title}`, 1);
        return this;
    }

    public setSubPage(profile: PROFILE): this {

        const formatter: SudooFormat = intl.format(this._language);

        this._title.setTitle(formatter.get(profile));
        return this;
    }

    public restore(): this {

        this._title.restoreTitle();
        return this;
    }
}
