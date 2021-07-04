import { statusCodesDictionary } from "../../../tools/statusCodes";

import {
    REQUESTD_SIGNUP,
    RECIVED_SIGNUP,
    FAILED_SIGNUP,
    REQUESTD_VERIFY_EMAIL,
    RECIVED_VERIFY_EMAIL,
    FAILED_VERIFY_EMAIL,
} from "../../actionsTypes/userAuthActionsTypes";

export const signUpInitialState = {
    isFetching: false,
    status: null,
    error: null,
};

export const signUpReducer = (state, action) => {
    let currentState = {};

    switch(action.type){
        case REQUESTD_SIGNUP: 
            currentState = {
                isFetching: true,
                status: null,
                error: null,
            };
            break;

        case RECIVED_SIGNUP: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                error: null,
            };
            break;

        case FAILED_SIGNUP: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                error: action.payload,
            };
            break;
    }

    return currentState;
};

export const verifyEmailInitialState = {
    isFetching: false,
    status: null,
    error: null,
};

export const verifyEmailReducer = (state, action) => {
    let currentState = {};

    switch(action.type){
        case REQUESTD_VERIFY_EMAIL: 
            currentState = {
                isFetching: true,
                status: null,
                error: null,
            };
            break;

        case RECIVED_VERIFY_EMAIL: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                error: null,
            };
            break;

        case FAILED_VERIFY_EMAIL: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                error: action.payload,
            };
            break;
    }

    return currentState;
};
