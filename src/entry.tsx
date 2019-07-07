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
import { CurrentRoute } from "./current/route";
import { DecoratorRoute } from "./decorator/route";
import { GroupRoute } from "./group/route";
import { MeRoute } from "./me/route";
import { OrganizationRoute } from "./organization/route";
import { Nav } from "./page/nav";
import { PreferenceRoute } from "./preference/route";
import { getCommandCenterName } from "./repository/command-center";

export type EntryStates = {

    readonly commandCenterName: string;
};

export class Entry extends React.Component<{}, EntryStates> {

    public readonly state: EntryStates = {

        commandCenterName: '',
    };

    public async componentDidMount() {

        try {

            const commandCenter: string | null = await getCommandCenterName();
            this._setName(commandCenter);
        } catch (err) {

            await new Promise((resolve: () => void) => setTimeout(resolve, 800));

            const commandCenter: string | null = await getCommandCenterName();
            this._setName(commandCenter);
        }
    }

    public render(): JSX.Element {

        return (
            <div className={EntryStyle.container}>
                <div className={EntryStyle.title}>
                    <NeonTitle>{this.state.commandCenterName}</NeonTitle>
                </div>
                <div className={EntryStyle.nav}>
                    <Route path="/" component={Nav} />
                </div>
                <div className={EntryStyle.content}>
                    <NeonPaper>
                        <MeRoute />
                        <CurrentRoute />
                        <UserRoute />
                        <OrganizationRoute />
                        <GroupRoute />
                        <DecoratorRoute />
                        <ApplicationRoute />
                        <PreferenceRoute />
                    </NeonPaper>
                </div>
            </div>
        );
    }

    private _setName(name: string | null) {

        if (name) {
            this.setState({
                commandCenterName: name,
            });
        } else {
            this.setState({
                commandCenterName: 'Brontosaurus RED',
            });
        }
    }
}

export default Entry;
