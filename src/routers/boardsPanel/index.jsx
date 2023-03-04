import { Switch, Route, useRouteMatch } from "react-router-dom";

import routes from "../../routes/boardsPanel";

const BoardsPanelRouter = props => {

    const { url } = useRouteMatch();

    const getRoutes = () => routes.map((route, index) => (
        <Route key={ index } path={`${ url }${ route.path }`}>
            <route.component/>
        </Route>
    ));

    return(
        <Switch>
            { getRoutes() }
        </Switch>
    );
};

export default BoardsPanelRouter;
