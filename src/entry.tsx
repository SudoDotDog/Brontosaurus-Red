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
import { Edit } from "./page/edit";
import { Nav } from "./page/nav";
import { Preference } from "./page/preference";
import { Register } from "./page/register";

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
                        <Route path="/edit" exact component={Edit} />
                        <Route path="/preference" exact component={Preference} />
                        <Route path="/register" exact component={Register} />
                    </NeonPaper>
                </div>
            </div>
        );
    }
}

export default Entry;
