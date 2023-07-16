import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { isValidEmail, isValidPassword } from "../../../tools/validators";
import { SUCCESS_MSG, UNAUTHORIZED_ERR } from "../../../tools/statusCodes";
import { getElementValue } from "../../../tools/helpers";

import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";

import texts from "../../../tools/localization/localization";

import notificationsContext from "../../../contexts/notificationsContext";

import useAPICaller from "../../../APIs/APICallers/APICallers";

import PasswordIcon from "../../../assets/icons/key.png";
import UserNameIcon from "../../../assets/icons/user.png";

import "./index.css";

const LogInPage = () => {
    const [ login, result ] = useAPICaller().loginCaller;
    const history = useHistory();

    const {
        error,
        success,
    } = useContext(notificationsContext)

    const logInTheUser = (e) => {
        e.preventDefault();
        const password = getElementValue("password");
        const email = getElementValue("email");

        if(!isValidPassword(password) || !isValidEmail(email)){
            error(texts["wrong format"]);
            return;
        }

        const userInformation = {
            password,
            email,
        };
        
        login(userInformation);
    };

    const redirectToBoardsPanel = () => history.push("boards-panel");

    useEffect(() => {
        console.log(result.error);
        if(result.status === UNAUTHORIZED_ERR){
            error(texts["wrong username or password"]);
            return;
        }

        if(result.status === SUCCESS_MSG){
            success(texts["successfull login"]);
            redirectToBoardsPanel();
            return;
        }

        if(result.error){
            error(texts["something wrong happened"]);
            redirectToBoardsPanel();
            return;
        }
    }, [ result.status ]);

    return (
        <div className="login-main-container">
            <div className="login-background-color-1"></div>
            <div className="login-background-color-2"></div>
            <div className="language-selector-container">
                <LanguageSelector/>
            </div>
            <div className="login-container">
            <form onSubmit={ logInTheUser }>
                <div className="input-container">
                    <input type="text" name="email" id="email"/>
                    <div><img src={ UserNameIcon }/></div>
                </div>
                <div className="input-container">
                    <input type="password" name="password" id="password"/>
                    <div><img src={ PasswordIcon }/></div>
                </div>
                <div className="login-submit-main-container">
                    <div className="login-submit-container">
                        <div className="hover"></div>
                        <div></div>
                        <input type="submit" value={ texts.login }/>
                    </div>
                </div>
            </form>
                </div>
        </div>
    );
}

export default LogInPage;
