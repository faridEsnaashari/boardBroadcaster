import React from "react";

import Routes from "../../components/Routes";

import BoardRoutes from "./board";
import LogInRoutes from "./logIn";
import LogOutRoutes from "./logOut";
import SignUpRoutes from "./signUp";
import BoardsPanelRoutes from "./boardsPanel";
import {changeHtmlTitle} from "../../tools/helpers";

const routes = [
    {
        path: "signup",
        component: () => {
            changeHtmlTitle("signup");
            return (<Routes routes={ SignUpRoutes }/>);
        },
    },
    {
        path: "logout",
        component: () => {
            changeHtmlTitle("logout")
            return (<Routes routes={ LogOutRoutes }/>);
        },
    },
    {
        path: "login",
        component: () => {
            changeHtmlTitle("login");
            return (<Routes routes={ LogInRoutes }/>);
        },
    },
    {
        path: "board",
        component: () => {
            changeHtmlTitle("board");
            return (<Routes routes={ BoardRoutes }/>);
        },
    },
    {
        path: "boards-panel",
        type: "private",
        component: () => {
            changeHtmlTitle("boards-panel");
            return(<Routes routes={ BoardsPanelRoutes }/>)
        },
    },
    {
        path: "/boards-panel",
        type: "redirect",
    },
];

export default routes;
