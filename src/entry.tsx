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
import { UserRoute } from "./account/route";
import { ApplicationRoute } from "./application/route";
import { GroupRoute } from "./group/route";
import { Nav } from "./page/nav";
import { PreferenceRoute } from "./preference/route";

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
                        <UserRoute />
                        <GroupRoute />
                        <ApplicationRoute />
                        <PreferenceRoute />
                    </NeonPaper>
                </div>
            </div>
        );
    }
}

export default Entry;
