/**
 * @author WMXPY
 * @namespace Util
 * @description Title
 */

import { Title } from "@sudoo/title";

export class TitleManager {

    private readonly _title: Title = Title.create();

    public setInit(title: string): this {

        this._title.setInit(title);
        return this;
    }
}
