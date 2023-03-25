import axios from "axios";

import {
    RECIVED_BOARD_UPDATE,
    REQUESTED_BOARD_UPDATE,
    FAILED_BOARD_UPDATE,

    RECIVED_BOARD_CREATE,
    REQUESTED_BOARD_CREATE,
    FAILED_BOARD_CREATE,

    RECIVED_BOARD_DELETE,
    REQUESTED_BOARD_DELETE,
    FAILED_BOARD_DELETE,

} from "../../actionsTypes/boardCrudActionsTypes";

export const boardCreateAction = (dispatch, data) => {
    dispatch({ type: REQUESTED_BOARD_CREATE });

    axios.post(`/board`, data)
        .then(response => dispatch({
            type: RECIVED_BOARD_CREATE,
            statusCode: response.status,
            payload: response.data,
        }))
        .catch(err => dispatch({
            type: FAILED_BOARD_CREATE,
            statusCode: err.response && err.response.status,
            payload: err.response && err.response.data,
        }));
};

export const boardDeleteAction = (dispatch, data) => {
    dispatch({ type: REQUESTED_BOARD_DELETE });

    axios.delete(`/board/${ data.id }`)
        .then(response => dispatch({
            type: RECIVED_BOARD_DELETE,
            statusCode: response.status,
            payload: response.data,
        }))
        .catch(err => dispatch({
            type: FAILED_BOARD_DELETE,
            statusCode: err.response && err.response.status,
            payload: err.response && err.response.data,
        }));
};
