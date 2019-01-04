import { getToken } from "./util";

export class Web {

    public static register(path: string, visit: boolean = false): void {

        if (!this._instance) {

            this._instance = new Web(path);
        }

        if (!visit) {

            this._instance.info();
        }
    }

    public static info() {

        if (!this._instance) {

            throw new Error('no instance available');
        }

        return this._instance.info();
    }

    private static _instance: Web | undefined;

    private readonly _path: string;

    private constructor(path: string) {

        this._path = path;
    }

    public info() {

        const token: string | null = getToken();
        if (token) {
            console.log(token);
        } else {
            window.location.href = this._path;
        }
    }
}
