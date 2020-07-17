/**
 * @author WMXPY
 * @namespace Util
 * @description Title
 */

import { Title } from "@sudoo/title";

export class TitleManager {

    private static readonly _instance: TitleManager = new TitleManager();

    public static setInit(title: string): TitleManager {

        const instance: TitleManager = this.instance;
        instance.setInit(title);
        return instance;
    }

    public static setSubPage(page: string): TitleManager {

        const instance: TitleManager = this.instance;
        instance.setSubPage(page);
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

    private constructor() {

        this._title = Title.create();
    }

    public setInit(title: string): this {

        this._title.setInit(title);
        this._title.setLevelBase(`{} | ${title}`, 1);
        return this;
    }

    public setSubPage(page: string): this {

        this._title.setTitle(page);
        return this;
    }

    public restore(): this {

        this._title.restoreTitle();
        return this;
    }
}
