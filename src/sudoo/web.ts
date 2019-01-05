import { getToken } from "./util";

export class Web {

    public static register(path: string, visit: boolean = false): Web {

        if (!this._instance) {

            this._instance = new Web(path);
        }

        if (!visit) {

            this._instance.info();
        }

        return this._instance;
    }

    public static info<T>(): T {

        if (!this._instance) {

            throw new Error('no instance available');
        }

        return this._instance.info<T>();
    }

    private static _instance: Web | undefined;

    private readonly _path: string;

    private _callbackPath: string | null;

    private constructor(path: string) {

        this._path = path;

        this._callbackPath = null;
    }

    public setCallbackPath(callbackPath: string): Web {

        this._callbackPath = callbackPath;
        return this;
    }

    public info<T>(): T {

        const token: string | null = getToken();
        if (token) {

            console.log(token);
        } else {

            const callbackPath: string = this._callbackPath || window.location.href;
            const location: string = `${this._path}?key=BRONTOSAURUS_RED&cb=${callbackPath}`;

            console.log(location);
            window.location.href = location;
        }

        return null as any;
    }
}
