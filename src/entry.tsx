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
import { AdminMenu } from "./navigation/admin-menu";
import { IndexMenu } from "./navigation/index-menu";
import { Nav } from "./navigation/navigation";
import { OrganizationRoute } from "./organization/route";
import { PreferenceRoute } from "./preference/route";
import { getCommandCenterName, GetCommandCenterNameResponse } from "./repository/command-center";
import { TagRoute } from "./tag/route";

export type EntryStates = {

    readonly commandCenterName: string;
    readonly accountName: string;
};

export class Entry extends React.Component<{}, EntryStates> {

    public readonly state: EntryStates = {

        commandCenterName: '',
        accountName: '',
    };

    public async componentDidMount() {

        const commandCenter: GetCommandCenterNameResponse = await getCommandCenterName();
        this._setName(commandCenter.commandCenterName);
        this._setAccountName(commandCenter.accountName);
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
                        <Route path="/" exact render={(props: any) =>
                            <IndexMenu
                                {...props}
                                accountName={this.state.accountName}
                                commandCenterName={this.state.commandCenterName}
                            />}
                        />
                        <Route path="/admin" exact component={AdminMenu} />
                        <MeRoute />
                        <CurrentRoute />
                        <UserRoute />
                        <OrganizationRoute />
                        <GroupRoute />
                        <DecoratorRoute />
                        <TagRoute />
                        <ApplicationRoute />
                        <PreferenceRoute />
                    </NeonPaper>
                </div>
            </div>
        );
    }

    private _setName(name?: string) {

        if (name) {
            this.setState({
                commandCenterName: name,
            });
            document.title = name;
        } else {
            this.setState({
                commandCenterName: 'Brontosaurus RED',
            });
            document.title = 'Red - Brontosaurus';
        }
    }

    private _setAccountName(name?: string) {

        if (name) {
            this.setState({
                accountName: name,
            });
        } else {
            this.setState({
                accountName: 'Brontosaurus Account',
            });
        }
    }
}

export default Entry;
