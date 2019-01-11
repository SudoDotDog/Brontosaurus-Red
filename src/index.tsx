/**
 * @author WMXPY
 * @namespace Portal
 * @description Index
 */

import { SudooProvider } from "@sudoo/redux";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { HashRouter } from "react-router-dom";
import '../style/common/global.sass';
import Entry from "./entry";
import { redux } from "./state/store";
import { Web } from "./sudoo/web";

declare const module: any;

Web.register('http://localhost:8083', true).setCallbackPath('http://localhost:8082');

const render: (App: any) => void = (App: any): void => {

    ReactDOM.render(
        (<AppContainer>
            <SudooProvider redux={redux}>
                <HashRouter>
                    <App />
                </HashRouter>
            </SudooProvider>
        </AppContainer>),
        document.getElementById("container"));
};

render(Entry);
if (module.hot) {

    module.hot.accept("./entry", () => {
        render(require("./entry").default);
    });
}
