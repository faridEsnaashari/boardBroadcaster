import { statusCodesDictionary } from "../../../tools/statusCodes";

import {
    REQUESTD_LOGIN,
    RECIVED_LOGIN,
    FAILED_LOGIN,
} from "../../actionsTypes/userAuthActionsTypes";

export const loginInitialState = {
    isFetching: false,
    status: null,
    error: null,
};

export const loginReducer = (state, action) => {
    let currentState = {};

    switch(action.type){
        case REQUESTD_LOGIN: 
            currentState = {
                isFetching: true,
                status: null,
                error: null,
            };
            break;

        case RECIVED_LOGIN: 
            const userToken = action.payload.data.userToken;
            localStorage.setItem("userToken", userToken);

            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                error: null,
            };
            break;

        case FAILED_LOGIN: 
            currentState = {
                isFetching: false,
                status: statusCodesDictionary[action.statusCode],
                error: action.payload,
            };
            break;
    }

    return currentState;
};
