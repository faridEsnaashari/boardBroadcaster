import axios from "axios";

import {
    RECIVED_USER_GET,
    REQUESTED_USER_GET,
    FAILED_USER_GET,
} from "../../actionsTypes/userActionsTypes";

export const userGetAction = (dispatch, withBoards) => {
    dispatch({ type: REQUESTED_USER_GET });

    axios.get(`/user?complete=${ withBoards }`)
        .then(response => dispatch({
            type: RECIVED_USER_GET,
            statusCode: response.status,
            payload: response.data,
        }))
        .catch(err => dispatch({
            type: FAILED_USER_GET,
            statusCode: err.response && err.response.status,
            payload: err.response && err.response.data,
        }));
};
