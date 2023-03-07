import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";

import "./styles.css";

import useAPICaller from "../../APIs/APICallers/APICallers.js";

import UserDetailsContext, { userDetailsContext as userInitialDetailsContext } from "../../contexts/userDetails";

import LoadingCircle from "../GeneralComponents/LoadingCircle/LoadingCircle";
import Test from "./Test";

const PrivateRoute = props => {

    const { children, path } = props;

    const history = useHistory();

    const [ getUserDetails, userDetails ] = useAPICaller().getUserCaller;
    useEffect(() => !userDetails.data && !userDetails.isFetching && getUserData(), []);

    const getUserData = () => getUserDetails(true);

    const [ userDetailsContext, setUserDetailsContext ] = useState({ ...userInitialDetailsContext, updateUserDetails: getUserData });

    useEffect(() => !userDetails.isFetching && userDetails.data && setUserDetailsContext({ ...userDetailsContext, user: userDetails.data.user, boards: userDetails.data.boards }), [userDetails]);

    if(userDetails.isFetching){
        return(
            <Route path={ path }>
                <div className="private-route-loading-container">
                    <div className="private-route-loading-main">
                        <LoadingCircle/>
                    </div>
                </div>
            </Route>
        );
    }
    if(userDetails.error){
        history.push("/login");
        return(
            <p>Not authorized</p>
        )
    }
    else{
        return(
            <Route path={ path }>
                <UserDetailsContext.Provider value={ userDetailsContext }>
                    { children }
                </UserDetailsContext.Provider>
            </Route>
        );
    }
};

export default PrivateRoute;
