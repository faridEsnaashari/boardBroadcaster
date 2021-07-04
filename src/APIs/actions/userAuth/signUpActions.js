import axios from "axios";

import {
    REQUESTD_SIGNUP,
    RECIVED_SIGNUP,
    FAILED_SIGNUP,
    REQUESTD_VERIFY_EMAIL,
    RECIVED_VERIFY_EMAIL,
    FAILED_VERIFY_EMAIL,
} from "../../actionsTypes/userAuthActionsTypes";

export const signUpAction = (dispatch, data) => {
    dispatch({ type: REQUESTD_SIGNUP });

    axios.post("/register", data)
        .then(response => {
            dispatch({ 
                type: RECIVED_SIGNUP,
                statusCode: response.status,
            });
        })
        .catch(error => {
            dispatch({
                type: FAILED_SIGNUP,
                statusCode: error.response.status,
                payload: error.response.data,
            })
        });
};

export const verifyEmailAction = (dispatch, verificationToken) => {
    dispatch({ type: REQUESTD_VERIFY_EMAIL });

    axios.get(`/verifyEmail/${ verificationToken }`)
        .then(response => {
            dispatch({ 
                type: RECIVED_VERIFY_EMAIL,
                statusCode: response.status,
            });
        })
        .catch(error => {
            dispatch({
                type: FAILED_VERIFY_EMAIL,
                statusCode: error.response.status,
                payload: error.response.data,
            })
        });
};
