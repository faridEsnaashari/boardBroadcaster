import Routes from "../../components/Routes";

import BoardRoutes from "./board";
import LogInRoutes from "./logIn";
import LogOutRoutes from "./logOut";
import SignUpRoutes from "./signUp";
import BoardsPanelRoutes from "./boardsPanel";

const routes = [
    {
        path: "signup",
        component: () => <Routes routes={ SignUpRoutes }/>,
    },
    {
        path: "logout",
        component: () => <Routes routes={ LogOutRoutes }/>,
    },
    {
        path: "login",
        component: () => <Routes routes={ LogInRoutes }/>,
    },
    {
        path: "board",
        component: () => <Routes routes={ BoardRoutes }/>,
    },
    {
        path: "boards-panel",
        type: "private",
        component: () => <Routes routes={ BoardsPanelRoutes }/>,
    },
    {
        path: "boards-panel",
        type: "redirect",
    },
];

export default routes;
