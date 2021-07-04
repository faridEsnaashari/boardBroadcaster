import { useReducer } from "react";

import { API_URL } from "../../tools/config";
import axios from "axios";

import {
    signUpReducer, 
    signUpInitialState,

    verifyEmailReducer, 
    verifyEmailInitialState,
} from "../reducers/userAuth/signUpReducers";
import { 
    signUpAction,
    verifyEmailAction,
} from "../actions/userAuth/signUpActions";

import { loginReducer, loginInitialState } from "../reducers/userAuth/loginReducers";
import { loginAction } from "../actions/userAuth/loginActions";

axios.defaults.baseURL = API_URL;
const userToken = localStorage.getItem("userToken");
if(userToken){
    axios.defaults.headers.common['Authorization'] = userToken;
}

export const useAPICaller = () => {
    const [ signUpResult, signUpDispatch ] = useReducer(signUpReducer, signUpInitialState);
    const signUp = data => signUpAction(signUpDispatch, data);

    const [ verifyEmailResult, verifyEmailDispatch ] = useReducer(verifyEmailReducer, verifyEmailInitialState);
    const verifyEmail = data => verifyEmailAction(verifyEmailDispatch, data);

    const [ loginResult, loginDispatch ] = useReducer(loginReducer, loginInitialState);
    const login = data => loginAction(loginDispatch, data);

    return { 
        signUpCaller: [ signUp, signUpResult ],
        verifyEmailCaller: [ verifyEmail, verifyEmailResult ],
        loginCaller: [ login, loginResult ],
    };
};

export default useAPICaller;
