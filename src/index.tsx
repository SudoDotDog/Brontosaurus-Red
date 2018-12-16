/**
 * @author WMXPY
 * @namespace Portal
 * @description Index
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import '../style/common/global.sass';
import Entry from "./entry";
import { getStore } from "./state/store";

declare const module: any;

const render: (App: any) => void = (App: any): void => {

    ReactDOM.render(
        (<Provider store={getStore()}>
            <AppContainer>
                <App />
            </AppContainer>
        </Provider>),
        document.getElementById("container"));
};

render(Entry);
if (module.hot) {

    module.hot.accept("./entry", () => {
        render(require("./entry").default);
    });
}
