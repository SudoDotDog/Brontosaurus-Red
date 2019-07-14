/**
 * @author WMXPY
 * @namespace Navigation
 * @description Sub Menu
 */

import { EnableForGroup } from "@brontosaurus/react";
import * as React from "react";
import { Route } from "react-router-dom";
import { AdminMenu } from "./admin";
import { CurrentMenu } from "./current";
import { MeMenu } from "./me";

export const SubMenuRoute: React.FC = () => {

    return (
        <React.Fragment>
            <EnableForGroup
                visit={false}
                group={['BRONTOSAURUS_SUPER_ADMIN']}>
                <Route path="/admin" component={AdminMenu} />
            </EnableForGroup>
            <Route path="/current" component={CurrentMenu} />
            <Route path="/me" component={MeMenu} />
        </React.Fragment>
    );
};
