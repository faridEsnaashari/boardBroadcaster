import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { isValidEmail, isValidPassword } from "../../../tools/validators";
import { SUCCESS_MSG, UNAUTHORIZED_ERR, INTERNAL_SERVER_ERR } from "../../../tools/statusCodes";
import { getElementValue } from "../../../tools/helpers";

import useAPICaller from "../../../APIs/APICallers/APICallers";

import PasswordIcon from "../../../assets/icons/key.png";
import UserNameIcon from "../../../assets/icons/user.png";

import "./index.css";

const LogInPage = () => {
    const [ login, result ] = useAPICaller().loginCaller;
    const history = useHistory();

    const logInTheUser = (e) => {
        e.preventDefault();
        const password = getElementValue("password");
        const email = getElementValue("email");

        if(!isValidPassword(password) || !isValidEmail(email)){
            console.error("invalid data");
            return;
        }

        const userInformation = {
            password,
            email,
        };
        
        login(userInformation);
    };

    const redirectToBoardsPanel = () => history.push("boards-panel");

    useEffect(() => result.status === SUCCESS_MSG && redirectToBoardsPanel(), [ result.status ]);

    return (
        <div className="login-main-container">
            <div className="login-background-color-1"></div>
            <div className="login-background-color-2"></div>
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
                        <input type="submit" value="Login"/>
                    </div>
                </div>
            </form>
                </div>
        </div>
    );
}

export default LogInPage;
