/**
 * @author WMXPY
 * @namespace Navigation
 * @description Sub Menu
 */

import { EnableForGroup } from "@brontosaurus/react";
import { Token } from "@brontosaurus/web";
import * as React from "react";
import { Route } from "react-router-dom";
import { AdminNav } from "./admin-nav";
import { CurrentMenu } from "./current";
import { IndexNav } from "./index-nav";
import { MeMenu } from "./me";

export const SubMenuRoute: React.FC = () => {

    return (
        <React.Fragment>
            <Route path={['/']} exact component={IndexNav} />
            <EnableForGroup
                visit={false}
                validation={(token: Token | null) => Boolean(token && token.organization)}
                group={['BRONTOSAURUS_ORGANIZATION_CONTROL']}>
                <Route path="/current" component={CurrentMenu} />
            </EnableForGroup>
            <EnableForGroup
                visit={false}
                group={['BRONTOSAURUS_SELF_CONTROL']}>
                <Route path="/me" component={MeMenu} />
            </EnableForGroup>
            <EnableForGroup
                visit={false}
                group={['BRONTOSAURUS_SUPER_ADMIN']}>
                <Route path="/admin" component={AdminNav} />
            </EnableForGroup>
        </React.Fragment>
    );
};
