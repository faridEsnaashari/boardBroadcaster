import { useEffect } from "react";

import { isValidEmail, isValidPassword, isValidUseerName } from "../../../tools/validators";
import { SUCCESS_CREATE_MSG } from "../../../tools/statusCodes";
import { getElementValue } from "../../../tools/helpers";

import useAPICaller from "../../../APIs/APICallers/APICallers";

import PasswordIcon from "../../../assets/icons/key.png";
import UserNameIcon from "../../../assets/icons/user.png";
import EmailIcon from "../../../assets/icons/mail.png";

import "./index.css"

const SignUpPage = () => {
    const [ signUp, result ] = useAPICaller().signUpCaller;

    useEffect(() => {
        if(result.status === SUCCESS_CREATE_MSG){
            window.location.href = "/signup/verification_sent";
        }
    }, [result]);

    const registerTheUser = (e) => {
        e.preventDefault();
        const name = getElementValue("name");
        const password = getElementValue("password");
        const email = getElementValue("email");

        if(!isValidUseerName(name) || !isValidPassword(password) || !isValidEmail(email)){
            console.error("invalid data");
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
                        <input type="submit" value="Signup"/>
                    </div>
                </div>
            </form>
                </div>
        </div>
    );
}

export default SignUpPage;
