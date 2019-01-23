/**
 * @author WMXPY
 * @namespace Red
 * @description Provider
 */

import { NeonPaper } from "@sudoo/neon/paper";
import { NeonTitle } from "@sudoo/neon/typography";
import * as React from "react";
import { Route } from "react-router-dom";
import * as EntryStyle from "../style/route/entry.scss";
import { Nav } from "./page/nav";
import { Preference } from "./page/preference";
import { Register } from "./page/register";
import { UserRoute } from "./user/user";

export class Entry extends React.Component {

    public render(): JSX.Element {

        return (
            <div className={EntryStyle.container}>
                <div className={EntryStyle.title}>
                    <NeonTitle>Brontosaurus RED</NeonTitle>
                </div>
                <div className={EntryStyle.nav}>
                    <Route path="/" component={Nav} />
                </div>
                <div className={EntryStyle.content}>
                    <NeonPaper>
                        <Route path="/user" component={UserRoute} />
                        <Route path="/preference" component={Preference} />
                        <Route path="/register" component={Register} />
                    </NeonPaper>
                </div>
            </div>
        );
    }
}

export default Entry;
