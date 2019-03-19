/**
 * @author WMXPY
 * @namespace Portal
 * @description Index
 */

import { Brontosaurus } from "@brontosaurus/web";
import { ReduxProvider } from "@sudoo/redux";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { HashRouter } from "react-router-dom";
import '../style/common/global.sass';
import Entry from "./entry";
import { redux } from "./state/store";

declare const module: any;

Brontosaurus.register('http://localhost:8080', 'BRONTOSAURUS_RED', 'http://localhost:8082/#/', true);

const render: (App: any) => void = (App: any): void => {

    ReactDOM.render(
        (<AppContainer>
            <ReduxProvider redux={redux}>
                <HashRouter>
                    <App />
                </HashRouter>
            </ReduxProvider>
        </AppContainer>),
        document.getElementById("container"));
};

render(Entry);
if (module.hot) {

    module.hot.accept("./entry", () => {
        render(require("./entry").default);
    });
}
