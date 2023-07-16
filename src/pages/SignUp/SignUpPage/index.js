import React, { useEffect, useContext } from "react";

import { isValidEmail, isValidPassword, isValidUseerName } from "../../../tools/validators";
import { SUCCESS_CREATE_MSG, CONFILICT_ERR } from "../../../tools/statusCodes";
import { getElementValue } from "../../../tools/helpers";
import texts from "../../../tools/localization/localization";

import NotificationContext from "../../../contexts/notificationsContext";

import useAPICaller from "../../../APIs/APICallers/APICallers";

import LanguageSelector from "../../../components/LanguageSelector/LanguageSelector";

import PasswordIcon from "../../../assets/icons/key.png";
import UserNameIcon from "../../../assets/icons/user.png";
import EmailIcon from "../../../assets/icons/mail.png";

import "./index.css"

const SignUpPage = () => {
    const [ signUp, result ] = useAPICaller().signUpCaller;

    const {
        error,
        success,
    } = useContext(NotificationContext);

    useEffect(() => {
        if(result.status === SUCCESS_CREATE_MSG){
            success(texts["successfull operation"]);
            window.location.href = "/signup/verification_sent";
            return;
        }

        if(result.status === CONFILICT_ERR){
            error(texts["this user already exists"]);
            return;
        }

        if(result.error){
            error(texts["something wron happened"]);
            return;
        }
    }, [result]);

    const registerTheUser = (e) => {
        e.preventDefault();
        const name = getElementValue("name");
        const password = getElementValue("password");
        const email = getElementValue("email");

        if(!isValidUseerName(name) || !isValidPassword(password) || !isValidEmail(email)){
            error(texts["wrong format"]);
            return;
        }

        const userInformation = {
            name,
            password,
            email,
        };

        signUp(userInformation);
    };

    return (
        <div className="signup-main-container">
            <div className="signup-background-color-1"></div>
            <div className="signup-background-color-2"></div>
            <div className="language-selector-container">
                <LanguageSelector/>
            </div>
            <div className="signup-container">
            <form onSubmit={ registerTheUser }>
                <div className="input-container">
                    <input type="text" name="name" id="name"/>
                    <div><img src={ UserNameIcon }/></div>
                </div>
                <div className="input-container">
                    <input type="password" name="password" id="password"/>
                    <div><img src={ PasswordIcon }/></div>
                </div>
                <div className="input-container">
                    <input type="text" name="email" id="email"/>
                    <div><img src={ EmailIcon }/></div>
                </div>
                <div className="signup-submit-main-container">
                    <div className="signup-submit-container">
                        <div className="hover"></div>
                        <div></div>
                        <input type="submit" value={ texts.signup }/>
                    </div>
                </div>
            </form>
                </div>
        </div>
    );
}

export default SignUpPage;
