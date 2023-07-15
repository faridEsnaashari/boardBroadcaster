import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import withSettingsHoc from "./components/HOCs/withSettingsHOCs";

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
export default withSettingsHoc(App);
