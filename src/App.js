import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Routes from "./components/Routes";

import routes from "./routes/app";

import "./App.css";

const App = () => {
    return(
        <Router>
            <Routes routes={ routes }/>
        </Router>
    );
};
export default App;
