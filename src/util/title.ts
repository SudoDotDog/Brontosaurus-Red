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

    public static setLanguage(language: LOCALE): TitleManager {

        const instance: TitleManager = this.instance;
        instance.setLanguage(language);
        return instance;
    }

    public static refreshTitle(): TitleManager {

        const instance: TitleManager = this.instance;
        instance.refreshTitle();
        return instance;
    }

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

    public static setNestedPage(profile: PROFILE, nested: PROFILE): TitleManager {

        const instance: TitleManager = this.instance;
        instance.setNestedPage(profile, nested);
        return instance;
    }

    public static setEditPage(profile: PROFILE, instanceValue: string): TitleManager {

        const instance: TitleManager = this.instance;
        instance.setEditPage(profile, instanceValue);
        return instance;
    }

    public static setMorePage(profile: PROFILE, instanceValue: string): TitleManager {

        const instance: TitleManager = this.instance;
        instance.setMorePage(profile, instanceValue);
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

    private _currentSetup: PROFILE[];
    private _instanceValue: string | null;

    private constructor() {

        this._title = Title.create();

        const checkedDefaultLanguage: LOCALE = getSystemLanguage(defaultLanguage);
        this._language = checkedDefaultLanguage;

        this._currentSetup = [];
        this._instanceValue = null;
    }

    public setLanguage(language: LOCALE): this {

        this._language = language;
        return this;
    }

    public setInit(title: string): this {

        this._title.setInit(title);
        this._title.setLevelBase(`{} | ${title}`, 1);
        this._title.setLevelBase(`{} | {} | ${title}`, 2);
        this._title.setLevelBase(`{} - {} | {} | ${title}`, 3);
        return this;
    }

    public setSubPage(profile: PROFILE): this {

        const formatter: SudooFormat = intl.format(this._language);

        this._title.setTitle(formatter.get(profile));

        this._currentSetup = [profile];
        this._instanceValue = null;
        return this;
    }

    public setNestedPage(profile: PROFILE, nested: PROFILE): this {

        const formatter: SudooFormat = intl.format(this._language);

        this._title.setTitle(
            formatter.get(nested),
            formatter.get(profile),
        );

        this._currentSetup = [nested, profile];
        this._instanceValue = null;
        return this;
    }

    public setEditPage(profile: PROFILE, instanceValue: string): this {

        const formatter: SudooFormat = intl.format(this._language);

        this._title.setTitle(
            instanceValue,
            formatter.get(PROFILE.EDIT),
            formatter.get(profile),
        );

        this._currentSetup = [PROFILE.EDIT, profile];
        this._instanceValue = instanceValue;
        return this;
    }

    public setMorePage(profile: PROFILE, instanceValue: string): this {

        const formatter: SudooFormat = intl.format(this._language);

        this._title.setTitle(
            instanceValue,
            formatter.get(PROFILE.MORE),
            formatter.get(profile),
        );

        this._currentSetup = [PROFILE.MORE, profile];
        this._instanceValue = instanceValue;
        return this;
    }

    public refreshTitle(): this {

        if (this._currentSetup.length === 0) {
            return this.restore();
        }

        const formatter: SudooFormat = intl.format(this._language);

        if (this._instanceValue) {

            this._title.setTitle(
                this._instanceValue,
                ...this._currentSetup.map((each: PROFILE) => formatter.get(each)),
            );
            return this;
        }

        this._title.setTitle(
            ...this._currentSetup.map((each: PROFILE) => formatter.get(each)),
        );
        return this;
    }

    public restore(): this {

        this._title.restoreTitle();
        this._currentSetup = [];
        this._instanceValue = null;
        return this;
    }
}
