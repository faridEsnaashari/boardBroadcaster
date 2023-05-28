import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";

const Routes = props => {

    const { 
        routes,
    } = props;

    const { url } = useRouteMatch();

    const getRoutes = () => routes.map((route, index) => {
        if(route.type === "redirect"){
            return (<Redirect push to={ route.path } key={ index }/>);
        }

        if(route.type === "private"){
            return(
                <PrivateRoute path={`${ url }${ route.path }`} key={ index }>
                    <route.component/>
                </PrivateRoute>
            );
        }

        return(
            <Route key={ index } path={`${ url }${ route.path }`}>
                <route.component/>
            </Route>
        );
    });

    return(
        <Switch>
            { getRoutes() }
        </Switch>
    );
};

export default Routes;
