import axios from "axios";

import {
    REQUESTD_LOGIN,
    RECIVED_LOGIN,
    FAILED_LOGIN,
} from "../../actionsTypes/userAuthActionsTypes";

export const loginAction = (dispatch, userInformation) => {
    dispatch({ type: REQUESTD_LOGIN });

    axios.post("/login", userInformation)
        .then(response => {
            dispatch({ 
                type: RECIVED_LOGIN,
                statusCode: response.status,
                payload: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: FAILED_LOGIN,
                statusCode: error.response.status,
                payload: error.response.data,
            })
        });
};
