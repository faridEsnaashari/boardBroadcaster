import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import withSettingsHoc from "./components/HOCs/withSettingsHOCs";
import withNotificationHoc from "./components/HOCs/withNotificationHOC.jsx";

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
export default withNotificationHoc(withSettingsHoc(App));
