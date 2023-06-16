import axios from "axios";

import {
    RECIVED_BOARD_EXISTS,
    REQUESTED_BOARD_EXISTS,
    FAILED_BOARD_EXISTS,

    RECIVED_BOARD_GET,
    REQUESTED_BOARD_GET,
    FAILED_BOARD_GET,

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

export const boardExistsAction = (dispatch, data) => {
    dispatch({ type: REQUESTED_BOARD_EXISTS });

    axios.get(`/board/identifier/${ data.id }`)
        .then(response => dispatch({
            type: RECIVED_BOARD_EXISTS,
            statusCode: response.status,
            payload: response.data,
        }))
        .catch(err => dispatch({
            type: FAILED_BOARD_EXISTS,
            statusCode: err.response && err.response.status,
            payload: err.response && err.response.data,
        }));
};

export const boardGetAction = (dispatch, data) => {
    dispatch({ type: REQUESTED_BOARD_GET });

    axios.get(`/board/${ data.id }`)
        .then(response => dispatch({
            type: RECIVED_BOARD_GET,
            statusCode: response.status,
            payload: response.data,
        }))
        .catch(err => dispatch({
            type: FAILED_BOARD_GET,
            statusCode: err.response && err.response.status,
            payload: err.response && err.response.data,
        }));
};

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

export const boardUpdateAction = (dispatch, data) => {
    dispatch({ type: REQUESTED_BOARD_UPDATE });

    const { id, ...rest } = data;

    axios.put(`/board/${ id }`, { ...rest })
        .then(response => dispatch({
            type: RECIVED_BOARD_UPDATE,
            statusCode: response.status,
            payload: response.data,
        }))
        .catch(err => dispatch({
            type: FAILED_BOARD_UPDATE,
            statusCode: err.response && err.response.status,
            payload: err.response && err.response.data,
        }));
};
