import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUpRouter from "./routers/singUp";
import LogInRouter from "./routers/logIn";

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
            </Switch>
        </Router>
    );
};
export default App;
