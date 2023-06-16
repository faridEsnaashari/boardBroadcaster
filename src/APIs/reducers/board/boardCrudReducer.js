import { statusCodesDictionary } from "../../../tools/statusCodes";

import {
    RECIVED_BOARD_EXISTS,
    REQUESTED_BOARD_EXISTS,
    FAILED_BOARD_EXISTS,

    RECIVED_BOARD_GET,
    REQUESTED_BOARD_GET,
    FAILED_BOARD_GET,

    RECIVED_BOARD_CREATE,
    REQUESTED_BOARD_CREATE,
    FAILED_BOARD_CREATE,

    REQUESTED_BOARD_DELETE,
    RECIVED_BOARD_DELETE,
    FAILED_BOARD_DELETE,

    REQUESTED_BOARD_UPDATE,
    RECIVED_BOARD_UPDATE,
    FAILED_BOARD_UPDATE,
} from "../../actionsTypes/boardCrudActionsTypes";

export const boardGetInitialState = {
    isFetching: false,
    status: null,
    data: null,
    error: null,
};

export const prepareBoard = (board) => ({ ...board, deleted: false, renamed: false, isLoading: { delete: false, rename: false } });

export const boardGetReducer = (state, action) => {
    let currentState = {};

    switch(action.type){
        case REQUESTED_BOARD_GET: 
            currentState = {
                isFetching: true,
                status: null,
                data: null,
                error: null,
            };
            break;

        case RECIVED_BOARD_GET: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: prepareBoard(action.payload.data),
                error: null,
            };
            break;

        case FAILED_BOARD_GET: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: null,
                error: action.payload,
            };
            break;
    }

    return currentState;
};

export const boardCreateInitialState = {
    isFetching: false,
    status: null,
    data: null,
    error: null,
};

export const boardCreateReducer = (state, action) => {
    let currentState = {};

    switch(action.type){
        case REQUESTED_BOARD_CREATE: 
            currentState = {
                isFetching: true,
                status: null,
                data: null,
                error: null,
            };
            break;

        case RECIVED_BOARD_CREATE: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: prepareBoard(action.payload.data),
                error: null,
            };
            break;

        case FAILED_BOARD_CREATE: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: null,
                error: action.payload,
            };
            break;
    }

    return currentState;
};

export const boardDeleteInitialState = {
    isFetching: false,
    status: null,
    data: null,
    error: null,
};

export const boardDeleteReducer = (state, action) => {
    let currentState = {};

    switch(action.type){
        case REQUESTED_BOARD_DELETE: 
            currentState = {
                isFetching: true,
                status: null,
                data: null,
                error: null,
            };
            break;

        case RECIVED_BOARD_DELETE: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: action.payload.data,
                error: null,
            };
            break;

        case FAILED_BOARD_DELETE: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: null,
                error: action.payload,
            };
            break;
    }

    return currentState;
};

export const boardUpdateInitialState = {
    isFetching: false,
    status: null,
    data: null,
    error: null,
};

export const boardUpdateReducer = (state, action) => {
    let currentState = {};

    switch(action.type){
        case REQUESTED_BOARD_UPDATE: 
            currentState = {
                isFetching: true,
                status: null,
                data: null,
                error: null,
            };
            break;

        case RECIVED_BOARD_UPDATE: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: prepareBoard(action.payload.data),
                error: null,
            };
            break;

        case FAILED_BOARD_UPDATE: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: null,
                error: action.payload,
            };
            break;
    }

    return currentState;
};

export const boardExistsInitialState = {
    isFetching: false,
    status: null,
    data: null,
    error: null,
};

export const boardExistsReducer = (state, action) => {
    let currentState = {};

    switch(action.type){
        case REQUESTED_BOARD_EXISTS: 
            currentState = {
                isFetching: true,
                status: null,
                data: null,
                error: null,
            };
            break;

        case RECIVED_BOARD_EXISTS: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: action.payload.message,
                error: null,
            };
            break;

        case FAILED_BOARD_EXISTS: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: null,
                error: action.payload,
            };
            break;
    }

    return currentState;
};
