import { statusCodesDictionary } from "../../../tools/statusCodes";

import {
    RECIVED_BOARD_CREATE,
    REQUESTED_BOARD_CREATE,
    FAILED_BOARD_CREATE,
} from "../../actionsTypes/boardCrudActionsTypes";

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
                data: action.payload.data,
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

