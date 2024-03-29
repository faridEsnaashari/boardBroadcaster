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

import { userGetReducer, userGetInitialState } from "../reducers/user/userReducers";
import { userGetAction } from "../actions/user/userActions";

import {
    boardGetReducer,
    boardGetInitialState,

    boardCreateReducer,
    boardCreateInitialState,

    boardDeleteReducer,
    boardDeleteInitialState,

    boardUpdateReducer,
    boardUpdateInitialState,

    boardExistsReducer,
    boardExistsInitialState,
} from "../reducers/board/boardCrudReducer";

import { 
    boardGetAction,
    boardCreateAction,
    boardDeleteAction,
    boardUpdateAction,
    boardExistsAction,
} from "../actions/board/boardCrudActions";

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

    const [ userGetResult, userGetDispatch ] = useReducer(userGetReducer, userGetInitialState);
    const getUser = data => userGetAction(userGetDispatch, data);

    const [ getBoardResult, boardGetDispatch ] = useReducer(boardGetReducer, boardGetInitialState);
    const getBoard = data => boardGetAction(boardGetDispatch, data);

    const [ createBoardResult, boardCreateDispatch ] = useReducer(boardCreateReducer, boardCreateInitialState);
    const createBoard = data => boardCreateAction(boardCreateDispatch, data);

    const [ deleteBoardResult, boardDeleteDispatch ] = useReducer(boardDeleteReducer, boardDeleteInitialState);
    const deleteBoard = data => boardDeleteAction(boardDeleteDispatch, data);

    const [ updateBoardResult, boardUpdateDispatch ] = useReducer(boardUpdateReducer, boardUpdateInitialState);
    const updateBoard = data => boardUpdateAction(boardUpdateDispatch, data);

    const [ boardExistsResult, boardExistsDispatch ] = useReducer(boardExistsReducer, boardExistsInitialState);
    const doesBoardExist = data => boardExistsAction(boardExistsDispatch, data);

    return { 
        signUpCaller: [ signUp, signUpResult ],
        verifyEmailCaller: [ verifyEmail, verifyEmailResult ],
        loginCaller: [ login, loginResult ],
        getUserCaller: [ getUser, userGetResult ],
        getBoardCaller: [ getBoard, getBoardResult ],
        createBoardCaller: [ createBoard, createBoardResult ],
        deleteBoardCaller: [ deleteBoard, deleteBoardResult ],
        updateBoardCaller: [ updateBoard, updateBoardResult ],
        doesBoardExistCaller: [ doesBoardExist, boardExistsResult ],
    };
};

export default useAPICaller;
