/**
 * @author WMXPY
 * @namespace Portal
 * @description Provider
 */

import * as React from "react";
import { ConnectedLogin } from "./page/login";

export class Entry extends React.Component {

    public render(): JSX.Element {

        return (<ConnectedLogin />);
    }
}

export default Entry;
