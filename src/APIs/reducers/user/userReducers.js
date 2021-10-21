import { statusCodesDictionary } from "../../../tools/statusCodes";

import {
    RECIVED_USER_GET,
    REQUESTED_USER_GET,
    FAILED_USER_GET,
} from "../../actionsTypes/userActionsTypes";

export const userGetInitialState = {
    isFetching: false,
    status: null,
    data: null,
    error: null,
};

export const userGetReducer = (state, action) => {
    let currentState = {};

    switch(action.type){
        case REQUESTED_USER_GET: 
            currentState = {
                isFetching: true,
                status: null,
                data: null,
                error: null,
            };
            break;

        case RECIVED_USER_GET: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                data: action.payload.data,
                error: null,
            };
            break;

        case FAILED_USER_GET: 
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

