/**
 * @author WMXPY
 * @namespace Portal
 * @description Provider
 */

import * as React from "react";
import { Route } from "react-router-dom";
import * as EntryStyle from "../style/route/entry.sass";
import { Edit } from "./page/edit";
import { Nav } from "./page/nav";
import { Register } from "./page/register";

export class Entry extends React.Component {

    public render(): JSX.Element {

        return (
            <div className={EntryStyle.container}>
                <div className={EntryStyle.nav}>
                    <Route path="/" component={Nav} />
                </div>
                <div className={EntryStyle.content}>
                    <Route path="/register" exact component={Register} />
                    <Route path="/edit" exact component={Edit} />
                </div>
            </div>
        );
    }
}

export default Entry;
