import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

import SignUpRouter from "./routers/singUp";
import LogInRouter from "./routers/logIn";
import BoardsPanelRouter from "./routers/boardsPanel";

import "./App.css";

const App = () => {
    return(
        <Router>
            <Switch>
                <Route path="/login">
                    <LogInRouter/>
                </Route>
                <Route path="/signup">
                    <SignUpRouter/>
                </Route>
                <PrivateRoute path="/boards-panel">
                    <BoardsPanelRouter/>
                </PrivateRoute>
                <Redirect push to="/boards-panel"/>
            </Switch>
        </Router>
    );
};
export default App;
